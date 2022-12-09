const API_CREATE_POST = "/api/v1/auction/listings/";

async function postCreateListingPost(title, description, tags = [], media) {
  if (!title || !description) {
    return null;
  }
  if (typeof title === "string" && typeof description === "string") {
    const postBody = {
      title: title,
      description: description,
      tags: tags,
      media: media,
    };
    let apiResponse = await noroffPOST(API_CREATE_POST, postBody);
    const json = await apiResponse.json();
    return {
      json: json,
      statusCode: apiResponse.status,
    };
  }
  return null;
}

export { postCreateListingPost };
