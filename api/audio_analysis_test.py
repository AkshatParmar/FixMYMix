import requests
import json

base_url = "https://api.spotify.com/v1/audio-analysis/"
track_id = '6rPO02ozF3bM7NnOV4h6s2'

headers = {
	# "Accept": "application/json",
	# "Content-Type": "application/json",
	"Authorization":" Bearer BQCRm6ycfUYnOEvDCLyaXod23WuScVY6BL6EwvWDeuyE0ijJJOiMVjb67z2i3XiMvdBKW28PGynXGUB5SJi_M27p6NMBstDYU8MpBeTMmMsqmQDErkPBHXTBYaSZZhwsDQnGEwVzqi4FDr-XLI2Ie_FIWLXVxtbCBbRPNue9YITqUbq-Svk"
}

'''
Request:
$ curl -H "Authorization: Bearer 
BQCRm6ycfUYnOEvDCLyaXod23WucVY6BL6EwvWDeuyE0ijJJOiMVjb67z2i3XiMvdBKW28PGynXGUB5SJi_M27p6NMBstDYU8MpBeTMmMsqmQDErkPBHXTBYaSZZhwsDQnGEwVzqi4FDr-XLI2Ie_FIWLXVxtbCBbRPNue9YITqUbq-Svk" 
https://api.spotify.com/v1/me
Response:
{
  "display_name" : "Akshat Parmar",
  "external_urls" : {
    "spotify" : "https://open.spotify.com/user/22njnu2ho3sr42yphgpf53zqq"
  },
  "followers" : {
    "href" : null,
    "total" : 18
  },
  "href" : "https://api.spotify.com/v1/users/22njnu2ho3sr42yphgpf53zqq",
  "id" : "22njnu2ho3sr42yphgpf53zqq",
  "images" : [ {
    "height" : null,
    "url" : "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1203351759701820&height=300&width=300&ext=1620476014&hash=AeQJYFes8VbGVtu05bE",
    "width" : null
  } ],
  "type" : "user",
  "uri" : "spotify:user:22njnu2ho3sr42yphgpf53zqq"
}

'''

r = requests.get(base_url+track_id, headers)

print(r.json())