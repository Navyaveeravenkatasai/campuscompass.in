navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([78.48571282585166, 17.60461950426339]);
}

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-streets-v11",
  center: { lng: 78.4858479583001, lat: 17.604679398210344 },
  zoom: 18,
  zLevel: 17,
  scrollZoom: true,
  doubleClickZoom: false,
  touchZoomRotate: false,
});
map.on("click", function (e) {
  map.flyTo({
    center: { lng: 78.4858479583001, lat: 17.604679398210344 },
    zoom: 18,
    speed: 0.75,
  });
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new mapboxgl.GeolocateControl({
    // positionOptions: {
    // enableHighAccuracy: true,
    // },
    trackUserLocation: true,
  })
);

//.................................................................001

map.on("load", () => {
  map.addSource("places", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              "<strong>BLOCK 01</strong><p>This block is mainly for the freshers, thier labs, subject faculties and thier staffrooms. Along with those it has the STI hub of the college.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: [78.48630383652159, 17.60460580655965],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>CAFETERIA</strong><p>The place which is loved by every student, where they have their food and make memories for a lifetime with thier friends. The perfect spot for hangouts in college.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: [78.48604037741573, 17.605136807336137],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>BLOCK 02</strong><p>This block is dedicated for the seniors.The floors of this block is divided on the basis of various departments, has their respective department HOD's along with their staffrooms.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: [78.48594025615641, 17.60448452417323],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>LIBRARY BLOCK</strong><p>The block contains library which has vast collections of various books,volumes and magzines on different topics, it also has the digital library of the college.Along with it has Yoga hall and GYM for students to maintain their health fitness.It has the CEER dept of the college too.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: [78.48546230918207, 17.605144556082934],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>NEW BLOCK</strong><p>This block is assigned for the CSE specialised branches. It has thier classrooms and thier respective department staffrooms.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: [78.48539198814206, 17.604423023856825],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>SPORTS ROOM</strong><p>The room has various indoor games for the players to practice and also the outdoor sports kit.The students can use the kits to improve their skills and take part in various competitions.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: [78.48609215180382, 17.605436206334495],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>PLAYGROUND-01</strong><p>This playground has the basketball, throwball, volleyball, kabbadi and tennikoit courts for the students to play and practice.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: [78.48700810554234, 17.60443529638453],
          },
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>PLAYGROUND-02</strong><p>This ares is decidated for the cricket, football, handball, kho-kho and softball teams of the college for practicing.</p>",
          },
          geometry: {
            type: "Point",
            coordinates: [78.4867507082123, 17.60519920275686],
          },
        },
      ],
    },
  });
  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "circle",
    source: "places",
    paint: {
      "circle-color": "#4264fb",
      "circle-radius": 6,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff",
    },
  });

  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mouseenter", "places", (e) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = "pointer";

    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseleave", "places", () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});