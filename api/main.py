from flask import Flask, request 
from flask_restful import Api, Resource, abort, reqparse
import os
import spotipy
from spotipy import oauth2
import logger

# Environment variables read from server side
myClientID = os.environ.get('client_id')
mySecret = os.environ.get('secret')

## Req {redirectURI, scope, cache_sys}
app = Flask(__name__)
api = Api(app)

class SpotipyMethods(Resource):
	def get_access_token(self, name, user):
		access_token = ''
		return {"name":name, "user":user}

	def get_playlists(self, user_id):
		return

	def user_profile(self, user_id):
		return

api.add_resource(SpotipyMethods, "/init/<string:name>/<string:user>")

if __name__ == "__main__":
	app.run(debug=True)
