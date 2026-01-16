export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address || "Unknown Address";
    this.location = { lat: location.lat, lng: location.lng }; // {lat: ..., lng: ...}
    this.id = new Date().toString() + Math.random().toString();
  }
}
