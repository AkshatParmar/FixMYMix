from flask import Flask, request 
from flask_restful import Api, Resource, abort, reqparse

app = Flask(__name__)
api = Api(app)

class SpotipyMethods(Resource):
	def get(self):
		return {"data":"Hello World"}

api.add_resource(SpotipyMethods, "/init")

if __name__ == "__main__":
	app.run(debug=True)
