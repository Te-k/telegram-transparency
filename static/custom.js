var dataset;

async function getData() {
  const url = "dataset.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    dataset = await response.json();
    drawtable();
    listCountriesSelect();
    drawCountry();
  } catch (error) {
    console.error(error.message);
  }
}

getData();

function listCountriesSelect() {
  countries = $.map(dataset, function(value, key) { return {"code": key, "country": getCountryName(key)} });
  sorted_countries = countries.sort((a, b) => {
    if (a.country < b.country) {
      return -1;
    }
    if (a.country > b.country) {
      return 1;
    }

    return 0;
  })
  for (country in sorted_countries) {
      $('#country-select').append($('<option>', {
        value: sorted_countries[country].code,
        text: sorted_countries[country].country
    }));
  }
}

function drawtable() {
    var $table = $('#dataTable')
    var period = $("#data-period").find(":selected").val()
    $table.bootstrapTable('removeAll')
    for (country in dataset) {
      switch(period) {
        case "2024Q13":
          var entry = dataset[country].filter((entry) => entry["from"] == "20240101" && entry["to"] == "20240930")[0];
          break;
        case "2024":
          var entry = dataset[country].filter((entry) => entry["from"] == "20240101" && entry["to"] == "20241231")[0];
          break;
        case "2024Q1":
          var entry = dataset[country].filter((entry) => entry["from"] == "20240101" && entry["to"] == "20240331")[0];
          break;
        case "2024Q2":
          var entry = dataset[country].filter((entry) => entry["from"] == "20240401" && entry["to"] == "20240630")[0];
          break;
        case "2024Q3":
          var entry = dataset[country].filter((entry) => entry["from"] == "20240701" && entry["to"] == "20240930")[0];
          break;
        case "2024Q4":
          var entry = dataset[country].filter((entry) => entry["from"] == "20241001" && entry["to"] == "20241231")[0];
          break;
      }

      if (entry !== undefined) {
        $table.bootstrapTable('insertRow', {index: 1, row: {
          country: getCountryName(country), requests: entry.requests, users: entry.users}})
        }
    }
    $table.bootstrapTable('resetView')
    $table.bootstrapTable('sortBy', {field: 'requests', sortOrder: 'desc'})
}

function drawCountry() {
  // It is ugly but it works
  $(".temp").remove();
  var country = $("#country-select").find(":selected").val()
  var entryq1 = dataset[country].filter((entry) => entry["from"] == "20240101" && entry["to"] == "20240331")[0];
  var entryq2 = dataset[country].filter((entry) => entry["from"] == "20240401" && entry["to"] == "20240630")[0];
  var entryq3 = dataset[country].filter((entry) => entry["from"] == "20240701" && entry["to"] == "20240930")[0];
  var entryq4 = dataset[country].filter((entry) => entry["from"] == "20241001" && entry["to"] == "20241231")[0];
  var entryq13 = dataset[country].filter((entry) => entry["from"] == "20240101" && entry["to"] == "20240930")[0];
  var entry2024 = dataset[country].filter((entry) => entry["from"] == "20240101" && entry["to"] == "20241231")[0];
  if (entryq1 !== undefined) {
    $("#country-table").find('tbody')
    .append($('<tr class="temp">')
        .append($('<th rowspan="2">').text('Requests'))
        .append($('<td class="text-center">').text(entryq1 === undefined ? "Unknown" : entryq1.requests))
        .append($('<td class="text-center">').text(entryq2 === undefined ? "Unknown" : entryq2.requests))
        .append($('<td class="text-center">').text(entryq3 === undefined ? "Unknown" : entryq3.requests))
        .append($('<td class="text-center">').text(entryq4 === undefined ? "Unknown" : entryq4.requests))
      );
      $("#country-table").find('tbody')
      .append($('<tr class="temp">')
        .append($('<td colspan="4" class="text-center">').text(entry2024 === undefined ? "Unknown" : entry2024.requests))
      )
      .append($('<tr class="temp">')
        .append($('<th rowspan="3">').text('Users'))
        .append($('<td class="text-center">').text(entryq1 === undefined ? "Unknown" : entryq1.users))
        .append($('<td class="text-center">').text(entryq2 === undefined ? "Unknown" : entryq2.users))
        .append($('<td class="text-center">').text(entryq3 === undefined ? "Unknown" : entryq3.users))
        .append($('<td class="text-center">').text(entryq4 === undefined ? "Unknown" : entryq4.users))
      );
      $("#country-table").find('tbody')
      .append($('<tr class="temp">')
        .append($('<td colspan="4" class="text-center">').text(entry2024 === undefined ? "Unknown" : entry2024.users))
      )
  } else {
    $("#country-table").find('tbody')
    .append($('<tr class="temp">')
        .append($('<th rowspan="2">').text('Requests'))
        .append($('<td class="text-center" colspan="3">').text(entryq13 === undefined ? "Unknown" : entryq13.requests))
        .append($('<td class="text-center">').text(entryq4 === undefined ? "Unknown" : entryq4.requests))
      );
      $("#country-table").find('tbody')
      .append($('<tr class="temp">')
      .append($('<td colspan="4" class="text-center">').text(entry2024 === undefined ? "Unknown" : entry2024.requests))
      )
      .append($('<tr class="temp">')
        .append($('<th rowspan="3">').text('Users'))
        .append($('<td class="text-center" colspan="3">').text(entryq13 === undefined ? "Unknown" : entryq13.users))
        .append($('<td class="text-center">').text(entryq4 === undefined ? "Unknown" : entryq4.users))
      );
      $("#country-table").find('tbody')
      .append($('<tr class="temp">')
        .append($('<td colspan="4" class="text-center">').text(entry2024 === undefined ? "Unknown" : entry2024.users))
      )
  }
}

function getCountryData(country, period="2024") {
    for (cc in dataset) {
      if (getCountryName(cc) == country) {
        var entry = dataset[country].filter((entry) => entry["from"] == "20240101" && entry["to"] == "20240930")[0]
        return entry.requests;
      }
    }
  return -1;
}

$("#data-period").on('change', function() {
    drawtable();
});

$('#country-select').on('change', function() {
  drawCountry();
});


var isoCountries = {
    "AFG": "Afghanistan",
    "ALA": "\u00c5land Islands",
    "ALB": "Albania",
    "DZA": "Algeria",
    "ASM": "American Samoa",
    "AND": "Andorra",
    "AGO": "Angola",
    "AIA": "Anguilla",
    "ATA": "Antarctica",
    "ATG": "Antigua and Barbuda",
    "ARG": "Argentina",
    "ARM": "Armenia",
    "ABW": "Aruba",
    "AUS": "Australia",
    "AUT": "Austria",
    "AZE": "Azerbaijan",
    "BHS": "Bahamas",
    "BHR": "Bahrain",
    "BGD": "Bangladesh",
    "BRB": "Barbados",
    "BLR": "Belarus",
    "BEL": "Belgium",
    "BLZ": "Belize",
    "BEN": "Benin",
    "BMU": "Bermuda",
    "BTN": "Bhutan",
    "BOL": "Bolivia, Plurinational State of",
    "BES": "Bonaire, Sint Eustatius and Saba",
    "BIH": "Bosnia and Herzegovina",
    "BWA": "Botswana",
    "BVT": "Bouvet Island",
    "BRA": "Brazil",
    "IOT": "British Indian Ocean Territory",
    "BRN": "Brunei Darussalam",
    "BGR": "Bulgaria",
    "BFA": "Burkina Faso",
    "BDI": "Burundi",
    "KHM": "Cambodia",
    "CMR": "Cameroon",
    "CAN": "Canada",
    "CPV": "Cape Verde",
    "CYM": "Cayman Islands",
    "CAF": "Central African Republic",
    "TCD": "Chad",
    "CHL": "Chile",
    "CHN": "China",
    "CXR": "Christmas Island",
    "CCK": "Cocos (Keeling) Islands",
    "COL": "Colombia",
    "COM": "Comoros",
    "COG": "Congo",
    "COD": "Congo, the Democratic Republic of the",
    "COK": "Cook Islands",
    "CRI": "Costa Rica",
    "CIV": "C\u00f4te d'Ivoire",
    "HRV": "Croatia",
    "CUB": "Cuba",
    "CUW": "Cura\u00e7ao",
    "CYP": "Cyprus",
    "CZE": "Czech Republic",
    "DNK": "Denmark",
    "DJI": "Djibouti",
    "DMA": "Dominica",
    "DOM": "Dominican Republic",
    "ECU": "Ecuador",
    "EGY": "Egypt",
    "SLV": "El Salvador",
    "GNQ": "Equatorial Guinea",
    "ERI": "Eritrea",
    "EST": "Estonia",
    "ETH": "Ethiopia",
    "FLK": "Falkland Islands (Malvinas)",
    "FRO": "Faroe Islands",
    "FJI": "Fiji",
    "FIN": "Finland",
    "FRA": "France",
    "GUF": "French Guiana",
    "PYF": "French Polynesia",
    "ATF": "French Southern Territories",
    "GAB": "Gabon",
    "GMB": "Gambia",
    "GEO": "Georgia",
    "DEU": "Germany",
    "GHA": "Ghana",
    "GIB": "Gibraltar",
    "GRC": "Greece",
    "GRL": "Greenland",
    "GRD": "Grenada",
    "GLP": "Guadeloupe",
    "GUM": "Guam",
    "GTM": "Guatemala",
    "GGY": "Guernsey",
    "GIN": "Guinea",
    "GNB": "Guinea-Bissau",
    "GUY": "Guyana",
    "HTI": "Haiti",
    "HMD": "Heard Island and McDonald Islands",
    "VAT": "Holy See (Vatican City State)",
    "HND": "Honduras",
    "HKG": "Hong Kong",
    "HUN": "Hungary",
    "ISL": "Iceland",
    "IND": "India",
    "IDN": "Indonesia",
    "IRN": "Iran, Islamic Republic of",
    "IRQ": "Iraq",
    "IRL": "Ireland",
    "IMN": "Isle of Man",
    "ISR": "Israel",
    "ITA": "Italy",
    "JAM": "Jamaica",
    "JPN": "Japan",
    "JEY": "Jersey",
    "JOR": "Jordan",
    "KAZ": "Kazakhstan",
    "KEN": "Kenya",
    "KIR": "Kiribati",
    "PRK": "Korea, Democratic People's Republic of",
    "KOR": "Korea, Republic of",
    "KWT": "Kuwait",
    "KGZ": "Kyrgyzstan",
    "LAO": "Lao People's Democratic Republic",
    "LVA": "Latvia",
    "LBN": "Lebanon",
    "LSO": "Lesotho",
    "LBR": "Liberia",
    "LBY": "Libya",
    "LIE": "Liechtenstein",
    "LTU": "Lithuania",
    "LUX": "Luxembourg",
    "MAC": "Macao",
    "MKD": "Macedonia, the former Yugoslav Republic of",
    "MDG": "Madagascar",
    "MWI": "Malawi",
    "MYS": "Malaysia",
    "MDV": "Maldives",
    "MLI": "Mali",
    "MLT": "Malta",
    "MHL": "Marshall Islands",
    "MTQ": "Martinique",
    "MRT": "Mauritania",
    "MUS": "Mauritius",
    "MYT": "Mayotte",
    "MEX": "Mexico",
    "FSM": "Micronesia, Federated States of",
    "MDA": "Moldova, Republic of",
    "MCO": "Monaco",
    "MNG": "Mongolia",
    "MNE": "Montenegro",
    "MSR": "Montserrat",
    "MAR": "Morocco",
    "MOZ": "Mozambique",
    "MMR": "Myanmar",
    "NAM": "Namibia",
    "NRU": "Nauru",
    "NPL": "Nepal",
    "NLD": "Netherlands",
    "NCL": "New Caledonia",
    "NZL": "New Zealand",
    "NIC": "Nicaragua",
    "NER": "Niger",
    "NGA": "Nigeria",
    "NIU": "Niue",
    "NFK": "Norfolk Island",
    "MNP": "Northern Mariana Islands",
    "NOR": "Norway",
    "OMN": "Oman",
    "PAK": "Pakistan",
    "PLW": "Palau",
    "PSE": "Palestinian Territory, Occupied",
    "PAN": "Panama",
    "PNG": "Papua New Guinea",
    "PRY": "Paraguay",
    "PER": "Peru",
    "PHL": "Philippines",
    "PCN": "Pitcairn",
    "POL": "Poland",
    "PRT": "Portugal",
    "PRI": "Puerto Rico",
    "QAT": "Qatar",
    "REU": "R\u00e9union",
    "ROU": "Romania",
    "RUS": "Russian Federation",
    "RWA": "Rwanda",
    "BLM": "Saint Barth\u00e9lemy",
    "SHN": "Saint Helena, Ascension and Tristan da Cunha",
    "KNA": "Saint Kitts and Nevis",
    "LCA": "Saint Lucia",
    "MAF": "Saint Martin (French part)",
    "SPM": "Saint Pierre and Miquelon",
    "VCT": "Saint Vincent and the Grenadines",
    "WSM": "Samoa",
    "SMR": "San Marino",
    "STP": "Sao Tome and Principe",
    "SAU": "Saudi Arabia",
    "SEN": "Senegal",
    "SRB": "Serbia",
    "SYC": "Seychelles",
    "SLE": "Sierra Leone",
    "SGP": "Singapore",
    "SXM": "Sint Maarten (Dutch part)",
    "SVK": "Slovakia",
    "SVN": "Slovenia",
    "SLB": "Solomon Islands",
    "SOM": "Somalia",
    "ZAF": "South Africa",
    "SGS": "South Georgia and the South Sandwich Islands",
    "SSD": "South Sudan",
    "ESP": "Spain",
    "LKA": "Sri Lanka",
    "SDN": "Sudan",
    "SUR": "Suriname",
    "SJM": "Svalbard and Jan Mayen",
    "SWZ": "Swaziland",
    "SWE": "Sweden",
    "CHE": "Switzerland",
    "SYR": "Syrian Arab Republic",
    "TWN": "Taiwan, Province of China",
    "TJK": "Tajikistan",
    "TZA": "Tanzania, United Republic of",
    "THA": "Thailand",
    "TLS": "Timor-Leste",
    "TGO": "Togo",
    "TKL": "Tokelau",
    "TON": "Tonga",
    "TTO": "Trinidad and Tobago",
    "TUN": "Tunisia",
    "TUR": "Turkey",
    "TKM": "Turkmenistan",
    "TCA": "Turks and Caicos Islands",
    "TUV": "Tuvalu",
    "UGA": "Uganda",
    "UKR": "Ukraine",
    "ARE": "United Arab Emirates",
    "GBR": "United Kingdom",
    "USA": "United States",
    "UMI": "United States Minor Outlying Islands",
    "URY": "Uruguay",
    "UZB": "Uzbekistan",
    "VUT": "Vanuatu",
    "VEN": "Venezuela, Bolivarian Republic of",
    "VNM": "Viet Nam",
    "VGB": "Virgin Islands, British",
    "VIR": "Virgin Islands, U.S.",
    "WLF": "Wallis and Futuna",
    "ESH": "Western Sahara",
    "YEM": "Yemen",
    "ZMB": "Zambia",
    "ZWE": "Zimbabwe"
}

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}
