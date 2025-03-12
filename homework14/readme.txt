GET ----> http://localhost:3000/api/fetch-and-save
GET ----> http://localhost:3000/todoes
POST ---> http://localhost:3000/api/submit
		body --->
 {
    "userId": 10101,
    "id": 101010,
    "title": "Submit my assignment",
    "completed": false
  }
PUT ----> http://localhost:3000/todo/67d1f7505e8da30f2386da79

	body ---->
	{
    "userId": 10101,
    "id": 101010,
    "title": "Submit my assignment",
    "completed": false
  }
DEETE --> http://localhost:3000/todo/67d1f7505e8da30f2386da79
