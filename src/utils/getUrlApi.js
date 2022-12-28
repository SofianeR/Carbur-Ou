export const getUrlApi = async (lat, long, arrayFilter) => {
  if (arrayFilter && arrayFilter.length > 0) {
    const filters = arrayFilter.join("&refine.fuel=");
    return `https://public.opendatasoft.com/api/records/1.0/search/?dataset=prix_des_carburants_j_7&q=&rows=50&facet=cp&facet=pop&facet=city&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand&refine.fuel=${filters}&geofilter.distance=${lat},${long},30000`;
  }
  return `https://public.opendatasoft.com/api/records/1.0/search/?dataset=prix_des_carburants_j_7&q=&rows=50&facet=cp&facet=pop&facet=city&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand&geofilter.distance=${lat},${long},30000`;
};
