import requests, os, cv2, numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from dotenv import load_dotenv
from django.http import JsonResponse
from insightface.app import FaceAnalysis
import json 
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.decorators import api_view, parser_classes
from datetime import datetime


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
class Img_sent:
  def __init__(self,image_path,location,time):

    self.image_path=image_path
    self.location=location
    self.time=time
    self.image = cv2.imread(image_path)


matchedkids=[1,2]

#@api_view(["POST"])
#@parser_classes([MultiPartParser, FormParser])
def facerec(request):
  if request.method=="GET":
   # image_file = request.FILES["image"]
    #save_path = os.path.join(settings.MEDIA_ROOT, image_file.name)
    #path = default_storage.save(save_path, image_file)
    image_url_in = 'skibdi'
    #request.build_absolute_uri(f"{settings.MEDIA_URL}{image_file.name}")


    test_img= Img_sent("/Users/aaronpinto/button/backend/button/data/rawr.jpeg",'4103 4th St N','09:00:00')
    app=FaceAnalysis()
    app.prepare(ctx_id=0, det_size=(640, 640))
    test_faces = app.get(test_img.image)
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
            if similarity> best_score:
              best_score = similarity
              best_match = {
                "case_number": caseNum,
                "organization_code":orgCode,
                "similarity":float(similarity),
                "image_url":image_url,
                "lastseen": image_url_in,
                "timestamp": datetime.now()
              }

    if best_match: 
      return JsonResponse({"best_match":best_match})
    
    else:
      return JsonResponse({"message": "No matches found."})


def matches(request):
  if request.method=="GET":

    print(f'{matchedkids[0]}')
    return 


      
   

