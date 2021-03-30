from flask import Flask, request 
from flask_restful import Api, Resource, abort, reqparse
import os
import spotipy
from spotipy import oauth2
import spotipy.util as util
import time

# Environment variables read from server side
myClientID = os.environ.get('REACT_APP_SPOTIFY_CLIENT_ID')
mySecret = os.environ.get('REACT_APP_SPOTIFY_CLIENT_SECRET')
myRedirect = os.environ.get('REACT_APP_SPOTIFY_REDIRECT_URI')
myUsername = '22njnu2ho3sr42yphgpf53zqq'
scope = 'user-library-read'

## Req {redirectURI, scope, cache_sys}
app = Flask(__name__)
api = Api(app)

''' 	Test methods     '''
@app.route('/time')
def get_current_time():
    return {'time': time.time(),
    		'date': time.ctime()}

@app.route('/info')
def get_info():
	return {'client_id':myClientID,
			'client secret':mySecret,
			'redirect uri':myRedirect,
			'User ID':myUsername,
			'Scope':scope}

@app.route('/login')
def login():
	token = util.prompt_for_user_token(myUsername, scope, myClientID, mySecret, myRedirect)
	if token:
		return token 
	else:
		return 'Please sign in'

''' Helper Function  '''
def show_tracks(tracks):
	for i, item in enumerate(tracks['items']):
		track = item['track']
		return ("   %d %32.32s %s" % (i, track['artists'][0]['name'],track['name']))

@app.route('/playlists')
def get_playlists():
	token = util.prompt_for_user_token(myUsername, scope, myClientID, mySecret, myRedirect)
	sp = spotipy.Spotify(auth=token)
	playlists = sp.user_playlists(myUsername)
	for playlist in playlists['items']:
		if playlist['owner']['id'] == myUsername:
			print(playlist['name'])
			print ('  total tracks', playlist['tracks']['total'])
			results = sp.playlist(playlist['id'],fields="tracks,next")
			tracks = results['tracks']
			while tracks['next']:
				tracks = sp.next(tracks)
				output = show_tracks(tracks)
	return playlists



class SpotipyMethods(Resource):
	def get_access_token(self, name, user):
		access_token = ''
		return {"name":name, "user":user}

	def get_playlists(self, user_id):
		return {"Playlist User":user_id}

	def user_profile(self, user_id):
		return {"User name": user_id}

api.add_resource(SpotipyMethods, "/init/<string:name>/<string:user>")

if __name__ == "__main__":
	app.run(debug=True)
