import { LatLng } from 'leaflet';
import axios from 'axios';

export interface Address {
      
    continent?: string,
        
    country?: string,
    country_code?: string,
    
    region?: string,
    state?: string,
    state_district?: string,
    county?: string,
    'ISO3166-2-lvl'?: string,
    
    municipality?: string,
    city?: string,
    town?: string,
    village?: string,
    
    city_district?: string,
    district?: string,
    borough?: string,
    suburb?: string,
    subdivision?: string,
    
    hamlet?: string,
    croft?: string,
    isolated_dwelling?: string,
    
    neighbourhood?: string,
    allotments?: string,
    quarter?: string,
    
    city_block?: string,
    residential?: string,
    farm?: string,
    farmyard?: string,
    industrial?: string,
    commercial?: string,
    retail?: string,
    
    road?: string,
    
    house_number?: string,
    house_name?: string,
    
    emergency?: string,
    historic?: string,
    military?: string,
    natural?: string,
    landuse?: string,
    place?: string,
    railway?: string,
    man_made?: string,
    aerialway?: string,
    boundary?: string,
    amenity?: string,
    aeroway?: string,
    club?: string,
    craft?: string,
    leisure?: string,
    office?: string,
    mountain_pass?: string,
    shop?: string,
    tourism?: string,
    bridge?: string,
    tunnel?: string,
    waterway?: string,
    
    postcode?: string,

    building?: string

}

export async function getAddress(latlng: LatLng): Promise<Address | null> {

    let result;

    try{

        result = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
                lat: latlng.lat,
                lon: latlng.lng,
                format: 'json'
            }
        });

    }catch(e){
        console.error(e);
        return null;
    }

    let { data } = result;

    if('error' in data){
        console.error(data.error);
        return null;
    }

    return data.address;

}

export function getRelevantName(address: Address): string | null {
    
    let result =

        address.building ??

        address.emergency ??
        address.historic ??
        address.military ??
        address.natural ??
        address.landuse ??
        address.place ??
        address.railway ??
        address.man_made ??
        address.aerialway ??
        address.boundary ??
        // address.amenity ??
        address.aeroway ??
        address.club ??
        address.craft ??
        address.leisure ??
        address.office ??
        address.mountain_pass ??
        address.shop ??
        address.tourism ??
        address.bridge ??
        address.tunnel ??
        address.waterway ??

        address.city_block ??
        address.residential ??
        address.farm ??
        address.farmyard ??
        address.industrial ??
        address.commercial ??
        address.retail ??

        address.house_name ??

        address.hamlet ??
        address.croft ??
        address.isolated_dwelling ??
    
        // address.road ??
        
        address.neighbourhood ??
        address.allotments ??
        address.quarter ??

        address.city_district ??
        address.district ??
        address.borough ??
        address.suburb ??
        address.subdivision ??

        address.municipality ??
        address.city ??
        address.town ??
        address.village ??
    
        address.region ??
        address.state ??
        address.state_district ??
        address.county ??

        address.country ??
        address.continent ??
        
        null;

    return result;
}
