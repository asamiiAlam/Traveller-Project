
let allTrips = [];
let filteredTrips = [];
async function loadTrips() {

  const response = await fetch("Json/trips.json");
  allTrips = await response.json();
 

  const container = document.getElementById("tripContainer");
  
  renderTrips(allTrips);

}
function generateStars(rating) {
  const value = Number(rating);
  const container = document.createElement("span");

  [1, 2, 3, 4, 5].map(star => {
    const icon = document.createElement("i");

    if (value >= star) {
      icon.className = "bi bi-star-fill";
    } else if (value >= star - 0.5) {
      icon.className = "bi bi-star-half";
    } else {
      icon.className = "bi bi-star";
    }

    container.appendChild(icon);
  });

  return container;
}


function renderTrips(trips) {

  const container = document.getElementById("tripContainer");

  // Instead of container.innerHTML = ""
  container.replaceChildren();


  trips.forEach(trip => {

    // CARD
    const card = document.createElement("div");
    card.className =
      "card border shadow-sm rounded-2 w-100 trip-card mb-3";


    // CARD BODY
    const cardBody = document.createElement("div");
    cardBody.className = "card-body p-4 position-relative";


    // TOP DISCOUNT BADGE
    if (trip.discount) {

      const discountTopBadge = document.createElement("span");

      discountTopBadge.className =
        "badge position-absolute m-2 fw-normal";

      discountTopBadge.style.fontSize = "12px";
      discountTopBadge.style.width = "200px";
      discountTopBadge.style.textAlign = "center";
      discountTopBadge.style.padding = "7px";
      discountTopBadge.style.top = "10px";
      discountTopBadge.style.right = "15px";
      discountTopBadge.style.borderRadius = "5px";
      discountTopBadge.style.background = "#EB5757";

      discountTopBadge.textContent =
        trip.discountLabel || trip.discount;

      cardBody.appendChild(discountTopBadge);
    }


    // ROW
    const row = document.createElement("div");
    row.className = "row g-3 align-items-center";


    // ---------------- IMAGE ----------------

    const imageColumn = document.createElement("div");
    imageColumn.className = "col-md-4";

    const image = document.createElement("img");

    image.src = trip.image;
    image.alt = trip.name;

    image.className =
      "img-fluid rounded-2 w-100";

    image.style.height = "170px";
    image.style.objectFit = "cover";

    imageColumn.appendChild(image);


    // ---------------- HOTEL DETAILS ----------------

    const detailsColumn = document.createElement("div");
    detailsColumn.className = "col-md-5";


    // Hotel name
    const hotelName = document.createElement("h6");

    hotelName.className = "fw-semibold mb-2";
    hotelName.style.fontSize = "20px";

    hotelName.textContent = trip.name;


    // Rating container
    const ratingContainer = document.createElement("div");

    ratingContainer.className =
      "d-flex align-items-center gap-2 mb-2";

    ratingContainer.style.fontSize = "13px";


    // Stars
    const stars = generateStars(trip.rating);
    stars.className = "text-warning";


    // Rating text
    const ratingText = document.createElement("span");

    ratingText.className = "text-secondary";

    ratingText.textContent =
      `${trip.rating} (${trip.reviews})`;


    ratingContainer.append(stars, ratingText);


    // Refund
    const refund = document.createElement("p");

    refund.className = "mb-1 fw-semibold";
    refund.style.fontSize = "13px";

    refund.textContent = trip.refund;


    // Description
    const description = document.createElement("p");

    description.className = "text-secondary mb-3";

    description.style.fontSize = "13px";
    description.style.lineHeight = "1.5";

    description.textContent =
      trip.description;


    // Availability button
    const button = document.createElement("a");

    button.href = "detail.html";

    button.className =
      "btn btn-primary btn-sm px-4 py-2 rounded-2";

    button.style.fontSize = "14px";
    button.style.background = "#2F80ED";

    button.textContent = "See availability";


    detailsColumn.append(
      hotelName,
      ratingContainer,
      refund,
      description,
      button
    );


    // ---------------- PRICE SECTION ----------------

    const priceColumn = document.createElement("div");

    priceColumn.className =
      "col-md-3 text-end d-flex flex-column align-items-end justify-content-end";

    priceColumn.style.marginTop = "100px";


    // Green discount badge
    if (trip.discount) {

      const discountPriceBadge =
        document.createElement("span");

      discountPriceBadge.className = "badge mb-2";

      discountPriceBadge.style.fontSize = "9px";
      discountPriceBadge.style.padding = "8px";
      discountPriceBadge.style.background = "#27AE60";

      if (typeof trip.discount === "number") {
        discountPriceBadge.textContent =
          `${trip.discount}% off`;
      }

      priceColumn.appendChild(discountPriceBadge);
    }


    // Duration
    const duration = document.createElement("p");

    duration.className =
      "text-secondary  mb-1";

    duration.style.fontSize = "13px";

    duration.textContent = trip.duration;


    // Price container
    const priceContainer = document.createElement("div");

    priceContainer.className = "mb-1";


    // Old price
    if (trip.discount) {

      const oldPrice = document.createElement("span");

      oldPrice.className =
        "text-danger text-decoration-line-through me-1";

      oldPrice.style.fontSize = "11px";

      oldPrice.textContent = trip.oldPrice;

      priceContainer.appendChild(oldPrice);
    }


    // New price
    const price = document.createElement("span");

    price.className = "fw-bold";
    price.style.fontSize = "18px";

    price.textContent = `$${trip.price}`;

    priceContainer.appendChild(price);


    // Fees
    const fees = document.createElement("p");

    fees.className = "text-secondary mb-0";
    fees.style.fontSize = "13px";

    fees.textContent = trip.fees;


    priceColumn.append(
      duration,
      priceContainer,
      fees
    );


    // COMBINE EVERYTHING 

    row.append(
      imageColumn,
      detailsColumn,
      priceColumn
    );

    cardBody.appendChild(row);

    card.appendChild(cardBody);

    container.appendChild(card);

  });

}

let selectedRating = 0;
document.querySelectorAll(".rating-btn").forEach(button => {

    button.addEventListener("click", function(){
        document.querySelectorAll(".rating-btn")
        .forEach(btn => btn.classList.remove("active"));

       this.classList.toggle("active");
       if(this.classList.contains("active")) {
            selectedRating = Number(this.dataset.rating);
            
        } else {
            selectedRating = 0;
            return;
        }
        
    
   
      



        applyFilters();

    });

});
let selectedCategory = "all";
function applyFilters() {

  filteredTrips = [...allTrips];

  // Category filter

   if(selectedCategory !== "all"){

    filteredTrips = filteredTrips.filter(trip =>
        trip.type === selectedCategory
    );

    }
    

    // 2. Search filter
    let searchText = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    if (searchText) {
        filteredTrips = filteredTrips.filter(trip =>
            trip.name.toLowerCase().includes(searchText)
        );
    }

    // 3. Rating filter
    if (typeof selectedRating !== "undefined" && selectedRating > 0) {
        filteredTrips = filteredTrips.filter(trip =>
            Number(trip.rating) >= selectedRating
        );
    }

    // 4. Budget filter
    let budgets = [];
    if (budget1.checked) budgets.push([0, 200]);
    if (budget2.checked) budgets.push([200, 500]);
    if (budget3.checked) budgets.push([500, 1000]);
    if (budget4.checked) budgets.push([1000, 2000]);
    if (budget5.checked) budgets.push([2000, 5000]);

    if (budgets.length) {
        filteredTrips = filteredTrips.filter(trip =>
            budgets.some(b =>
                Number(trip.price) >= b[0] &&
                Number(trip.price) <= b[1]
            )
        );
    }

    // 5. Popular Filters
    let selectedPopular = [];
    if (filter1.checked) selectedPopular.push("freeCancellation");
    if (filter2.checked) selectedPopular.push("spa");
    if (filter3.checked) selectedPopular.push("beachFront");
    if (filter4.checked) selectedPopular.push("hotTub");
    if (filter5.checked) selectedPopular.push("bookWithoutCreditCard");
    if (filter6.checked) selectedPopular.push("noPrepayment");

    if (selectedPopular.length) {
        filteredTrips = filteredTrips.filter(trip =>
            selectedPopular.every(item =>
                trip.popularFilters.includes(item)
            )
        );
    }

    // 6. Activities Filter
    let selectedActivities = [];
    if (activity1.checked) selectedActivities.push("fishing");
    if (activity2.checked) selectedActivities.push("hiking");
    if (activity3.checked) selectedActivities.push("beach");
    if (activity4.checked) selectedActivities.push("cycling");
    if (activity5.checked) selectedActivities.push("sauna");
    if (activity6.checked) selectedActivities.push("nightLights");

    if (selectedActivities.length) {
        filteredTrips = filteredTrips.filter(trip =>
            selectedActivities.every(item =>
                trip.activities.includes(item)
            )
        );
    }
     let sortOption = document
    .getElementById("sortby")
    .value;


    if(sortOption === "Price low to high"){

    filteredTrips.sort((a,b)=>
        Number(a.price) - Number(b.price)
    );

     }


    else if(sortOption === "Price high to low"){

    filteredTrips.sort((a,b)=>
        Number(b.price) - Number(a.price)
    );

}

    // 7. Render results
    renderTrips(filteredTrips);

    //
}
document.querySelectorAll(".buttons button")
.forEach(button => {

    button.addEventListener("click", function(){


        document.querySelectorAll(".buttons button")
        .forEach(btn => btn.classList.remove("active"));


        this.classList.add("active");
      


        let text = this.innerText;


        if(text === "Hotel and apartments"){
            selectedCategory = "apartment";
        }

        else if(text === "Residence"){
            selectedCategory = "residence";
        }

        else if(text === "Resort"){
            selectedCategory = "resort";
        }

        else if(text === "Shared Space"){
            selectedCategory = "shared";
        }

        else{
            selectedCategory = "all";
        }


        applyFilters();


    });

});






document
.getElementById("search")
.addEventListener("input", applyFilters);



document
.querySelectorAll("input[type='checkbox']")
.forEach(checkbox => {

    checkbox.addEventListener("change", applyFilters);

});

document
.getElementById("sortby").addEventListener("change", applyFilters);




loadTrips();

