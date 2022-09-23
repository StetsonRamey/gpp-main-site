let autocomplete;
let address1Field = document.getElementById("ship-address");
let postalField = document.querySelector("#postcode");
let firstRadio = document.querySelector("#exterior-radio");
// console.log('do we get this?')

export default function initAutocomplete() {
  // console.log("loaded");
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["us"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });

  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  const place = autocomplete.getPlace();
  let address1 = "";
  let postcode = "";

  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        postcode = `${component.long_name}${postcode}`;
        break;
      }

      case "locality": {
        document.querySelector("#locality").value = component.long_name;
        break;
      }

      case "administrative_area_level_1": {
        document.querySelector("#state").value = component.short_name;
        break;
      }
    }
  }

  address1Field.value = address1;
  postalField.value = postcode;

  firstRadio.focus();
}
