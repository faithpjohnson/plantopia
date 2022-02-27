import tokenService from "./tokenService";

const BASE_URL = "/api/comments/";

export function create(commentData) {

  console.log("commentData", commentData);

  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: "Bearer " + tokenService.getToken(),
    }),
  }).then((res) => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error(
      "Error submitting the Form! Hey Check the Express Terminal"
    );
  });
}

export function getBySightingID(sightingID){
  return fetch(`${BASE_URL}/${sightingID}`, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => {
		if(res.ok) return res.json()
		throw new Error('Problem Fetching By ID')
	})

}