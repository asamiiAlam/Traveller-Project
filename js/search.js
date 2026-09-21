
let allTrips = [];
let filteredTrips = [];
function generateStars(rating) {

    let stars = "";

    let value = Number(rating);

    let fullStars = Math.floor(value);

    let hasHalfStar = value % 1 !== 0;


    // Full stars
    for(let i = 0; i < fullStars; i++) {

        stars += `<i class="bi bi-star-fill"></i>`;

    }


    // Half star
    if(hasHalfStar) {

        stars += `<i class="bi bi-star-half"></i>`;

    }


    // Empty stars
    let emptyStars = 5 - Math.ceil(value);

    for(let i = 0; i < emptyStars; i++) {

        stars += `<i class="bi bi-star"></i>`;

    }


    return stars;

}

async function loadTrips() {

  const response = await fetch("Json/trips.json");
  allTrips = await response.json();
 

  const container = document.getElementById("tripContainer");
  
  renderTrips(allTrips);

}
function renderTrips(trips) {

  const container = document.getElementById("tripContainer");
  container.innerHTML = "";


  trips.forEach(trip => {


    const card = document.createElement("div");


    card.className =
      "card border shadow-sm rounded-2 w-100 trip-card mb-3";



    // Discount badge top right

    const discountTopBadge = trip.discount
      ? `
        <span
          class="badge position-absolute m-2 fw-normal"
          style="
            font-size:12px;
            width:200px;
            text-align:center;
            padding:7px;
            top:10px;
            right:15px;
        
            border-radius:5px;
            background:#EB5757;
          "
        >
          ${trip.discountLabel || trip.discount}
        </span>
      `
      : "";




    // Green discount badge

    const discountPriceBadge = trip.discount
      ? `
        <span
          class="badge mb-2"
          style="
            font-size:9px;
            padding:8px;
            background:#27AE60;
          "
        >
          ${typeof trip.discount === "number" 
            ? trip.discount + "% off" 
            : ""}
        </span>
      `
      : "";




    // Old price

    const oldPrice = trip.discount
      ? `
        <span
          class="text-danger text-decoration-line-through me-1"
          style="font-size:11px;"
        >
          ${trip.oldPrice}
        </span>
      `
      : "";




    card.innerHTML = `


      <div class="card-body p-4 position-relative">


        ${discountTopBadge}



        <div class="row g-3 align-items-center">



          <!-- IMAGE -->

          <div class="col-md-4">

            <img
              src="${trip.image}"
              alt="${trip.name}"
              class="img-fluid rounded-2 w-100"
              style="
                height:170px;
                object-fit:cover;
              "
            >

          </div>





          <!-- HOTEL DETAILS -->


          <div class="col-md-5">


            <h6
              class="fw-semibold mb-2"
              style="font-size:14px;"
            >
              ${trip.name}
            </h6>




            <div
              class="d-flex align-items-center gap-2 mb-2"
              style="font-size:10px;"
            >

              <span class="text-warning">
                ${generateStars(trip.rating)}
              </span>


              <span class="text-secondary">
                ${trip.rating} (${trip.reviews})
              </span>


            </div>





            <p
              class="mb-1 fw-semibold"
              style="font-size:10px;"
            >
              ${trip.refund}
            </p>





            <p
              class="text-secondary mb-3"
              style="
                font-size:10px;
                line-height:1.5;
              "
            >

              Live a little and celebrate with champagne.<br>
              Starts include a glass of French champagne,
              parking and a late checkout.

            </p>





            <a
              href="detail.html"
              class="btn btn-primary btn-sm px-4 py-2"
              style="
                font-size:14px;
                background:#2F80ED;
              "
            >
              See availability
            </a>



          </div>







          <!-- PRICE SECTION -->


          <div
            class="col-md-3 text-end d-flex flex-column align-items-end justify-content-end"
            style="margin-top:100px;"
          >



            ${discountPriceBadge}





            <p
              class="text-secondary fw-semibold mb-1"
              style="
                font-size:8px;
              "
            >
              ${trip.duration}
            </p>





            <div class="mb-1">


              ${oldPrice}



              <span
                class="fw-bold"
                style="font-size:18px;"
              >
                $${trip.price}
              </span>


            </div>





            <p
              class="text-secondary mb-0"
              style="font-size:9px;"
            >
              ${trip.fees}
            </p>




          </div>




        </div>


      </div>


    `;



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

