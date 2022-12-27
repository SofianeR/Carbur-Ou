const AGIP = require("../../assets/logoStation/Agip_Logo.png");
const ATAC = require("../../assets/logoStation/Atac_Logo.png");
const AUCHAN = require("../../assets/logoStation/Auchan_Logo.png");
const AVIA = require("../../assets/logoStation/Avia_Logo.png");
const BP = require("../../assets/logoStation/Bp_Logo.png");
const CARREFOUR = require("../../assets/logoStation/Carrefour_Logo.png");
const CARREFOUR_MARKET = require("../../assets/logoStation/CarrefourMarket_Logo.png");
const CASINO = require("../../assets/logoStation/Casino_Logo.png");
const COLRUYT = require("../../assets/logoStation/Colruyt_Logo.png");

const CORA = require("../../assets/logoStation/Cora_Logo.png");
const DYNEFF = require("../../assets/logoStation/Dyneff_Logo.png");
const ELAN = require("../../assets/logoStation/Elan_Logo.jpeg");
const ESSO = require("../../assets/logoStation/Esso_Logo.png");
const ESSO_EXPRESS = require("../../assets/logoStation/EssoExpress_Logo.jpeg");
const GEANT = require("../../assets/logoStation/Geant_Logo.webp");
const INTERMARCHE = require("../../assets/logoStation/Intermarche_Logo.png");
const LECLERC = require("../../assets/logoStation/Leclerc_Logo.png");
const MAXIMARCHE = require("../../assets/logoStation/Maximarche_Logo.png");
const NETTO = require("../../assets/logoStation/Netto_Logo.png");
const ROADY = require("../../assets/logoStation/Roady_Logo.jpeg");
const SHELL = require("../../assets/logoStation/Shell_Logo.png");
const SIMPLY = require("../../assets/logoStation/Simply_Logo.png");

const SUPERU = require("../../assets/logoStation/SuperU_Logo.jpg");
const SYSTEMEU = require("../../assets/logoStation/SystemeU_Logo.png");

const TOTAL = require("../../assets/logoStation/Total_Logo.png");
const TOTAL_ACCESS = require("../../assets/logoStation/TotalAccess_Logo.png");
const VITO = require("../../assets/logoStation/Vito_Logo.png");
const PLACEHOLDER = require("../../assets/logoStation/PlaceHolder_Logo.png");

export const getIcon = (brand) => {
  //   console.log(brand);
  switch (brand) {
    case "agip":
      return AGIP;
    case "atac":
      return ATAC;
    case "auchan":
      return AUCHAN;
    case "avia":
      return AVIA;
    case "bp":
      return BP;

    case "carrefour":
      return CARREFOUR;
    case "carrefour market":
      return CARREFOUR_MARKET;
    case "casino":
      return CASINO;
    case "colruyt":
      return COLRUYT;
    case "cora":
      return CORA;
    case "dyneff":
      return DYNEFF;
    case "elan":
      return ELAN;

    case "esso":
      return ESSO;
    case "esso express":
      return ESSO_EXPRESS;
    case "géant":
      return GEANT;
    case "intermarché":
      return INTERMARCHE;
    case "leclerc":
      return LECLERC;
    case "maximarché":
      return MAXIMARCHE;
    case "netto":
      return NETTO;
    case "roady":
      return ROADY;
    case "shell":
      return SHELL;
    case "simply market":
      return SIMPLY;
    case "super u":
      return SUPERU;
    case "système u":
      return SYSTEMEU;
    case "total":
      return TOTAL;
    case "total access":
      return TOTAL_ACCESS;
    case "vito":
      return VITO;

    default:
      return PLACEHOLDER;
  }
};
