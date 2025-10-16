import requests, os, cv2, numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from dotenv import load_dotenv
from django.http import JsonResponse
from insightface.app import FaceAnalysis
import json 

load_dotenv()

API_BASE="https://posterapi.ncmec.org"
url = "https://posterapi.ncmec.org/Auth/Token"
id=os.getenv('clientId')
secret=os.getenv('clientSecret')
data={
  "clientId": os.getenv('clientId'),
  "clientSecret": os.getenv('clientSecret')
}

headers={
   "accept":"*/*",
   "Content-Type": "application/json-patch+json"
  }
#resp = requests.post(
   # url,
   # headers=headers,
   # json=data
#)

TOKEN = os.getenv('TOKEN')


def matches(request):
  matchedkids=7
  return matchedkids
def facerec(request):
  if request.method=="GET":
    test_img=cv2.imread('/Users/aaronpinto/button/backend/button/data/rawr.jpeg')
    app=FaceAnalysis()
    app.prepare(ctx_id=0, det_size=(640, 640))
    test_faces = app.get(test_img)
    headers = {"Authorization": f"Bearer {TOKEN}"}
    posters_url = f"{API_BASE}/Posters?organizationCodes=NCMC&skip=0&limit=20&enableIpGeolocationSearch=true&geolocationDistanceInMiles=50"
    posters= requests.get(posters_url,headers=headers).json().get("posters")

    best_match = None
    best_score = -1
    for poster in posters:
        orgCode = poster.get('organizationCode')
        caseNum = poster.get('caseNumber')
        md5= poster.get('children')[0].get('photos')[0].get('md5')
        image_url= f"{API_BASE}/Poster/{orgCode}/{caseNum}/Photo/{md5}"
        image_resp=requests.get(image_url,headers=headers)

        np_arr= np.frombuffer(image_resp.content,np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR) 
        faces=app.get(img)
        for test_face in test_faces:
          test_emb= test_face.normed_embedding
          for face in faces:
            emb=face.normed_embedding
            similarity=np.dot(test_emb,emb)
            if similarity>best_score:
              best_score = similarity
              best_match = {
                "case_number": caseNum,
                "organization_code":orgCode,
                "similarity":float(similarity),
                "image_url":image_url
              }
    if best_match: 
      return JsonResponse({"best_match":best_match})
    else:
      return JsonResponse({"message": "No matches found."})





      
   

