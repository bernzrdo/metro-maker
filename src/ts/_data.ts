import leaflet from 'leaflet';

export interface SerializedMetro {
    systems: { id: string, name: string, lines: string[] }[],
    lines: { id: string, name: string, color: string, stations: string[] }[],
    stations: { id: string, name: string, lat: number, lng: number }[]
}

export interface System {
    id: string,
    name: string,
    lines: Line[]
}

export interface Line {
    id: string,
    name: string,
    color: string,
    stations: Station[]
}

export interface Station {
    id: string,
    name: string,
    coords: leaflet.LatLng
}

const SIMPLE_VIEW_ZOOM = 11;

export class Metro {

    static DEFAULT: SerializedMetro = {
        systems: [
            {
                id: "6fd656ad-3175-4046-a472-98ce4b91785f",
                name: "Metropolitano de Lisboa",
                lines: [
                    "24528266-fca4-4f6a-b61b-096832244ced",
                    "0b333b69-fe8b-46d1-a218-fd1be7dd7aeb",
                    "d618c731-db9b-4692-898b-6c3d8e5fd9d0",
                    "f77cf6a9-f955-4d2d-a00a-398bdac41eb9"
                ]
            }
        ],
        lines: [
            {
                id: "24528266-fca4-4f6a-b61b-096832244ced",
                name: "Linha Azul",
                color: "#5488c5",
                stations: [
                    "d22c4e06-22b3-40ab-9738-f2c858c866c8",
                    "65686531-978c-439a-8efc-c781e108c19e",
                    "f7d33a65-e4e8-42b7-9453-c498461df87a",
                    "44ff9f26-c318-445c-8d4f-86109f7ba43b",
                    "83a28772-d932-4ee0-aaaa-c8173173f704",
                    "7cf7427a-632b-4d52-8462-285502106d74",
                    "17924e78-43d1-46ec-9706-213a9355ebe2",
                    "b500d8ab-98af-4589-9397-e805e454fdba",
                    "e7da790d-3115-4c2b-ba67-9cdbf52a5bdb",
                    "09dfdb43-1da0-41f3-948e-14e7febdd70b",
                    "8a7a46ec-2d68-4420-a4e8-dd4fe703539b",
                    "7952664e-a682-4373-bd17-75dde8cb759e",
                    "58e27cac-fb7c-4243-83d2-59f8f1e479fb",
                    "84648dfb-ea6c-45bd-a817-53921f97c0ab",
                    "fd2abf3f-97b8-4967-b594-5b19bb93bcfb",
                    "9af1b57b-4506-4ddc-a330-6726c4a8bc79",
                    "1fd1760e-1b38-4f6c-929a-accc6d2615de",
                    "b471d54a-2c49-411e-ab70-bcab9e6c097b"
                ]
            },
            {
                id: "0b333b69-fe8b-46d1-a218-fd1be7dd7aeb",
                name: "Linha Amarela",
                color: "#fdb713",
                stations: [
                    "bb06300b-e6c8-49f6-a3e3-346b4f7a439c",
                    "4f84a87a-d981-4695-9b27-be758ac38a6f",
                    "8f4a2b87-b2a6-4819-aa45-97ab66eee0a5",
                    "52b2848d-063e-458e-9389-fbd00ee3eb32",
                    "e3fbf632-1cb4-4d10-bf23-a10eae1cb3de",
                    "819f94ce-a33d-44a2-a44a-e9f03f1abc5f",
                    "1d542830-1d75-44fe-91d3-53838a544d11",
                    "e2c08e69-3c55-4d6b-9ba0-23724cebf9e4",
                    "755f1f4f-6b83-47c7-8421-a62b70476ce9",
                    "e7673e70-247f-48b1-9326-6b00b9f5178d",
                    "d076ade2-ad58-4240-80f5-28b6d283a4cb",
                    "58e27cac-fb7c-4243-83d2-59f8f1e479fb",
                    "0b007489-0650-42fb-aaad-73b1399f94d5"
                ]
            },
            {
                id: "d618c731-db9b-4692-898b-6c3d8e5fd9d0",
                name: "Linha Verde",
                color: "#00a8a5",
                stations: [
                    "355d22cd-863f-4d28-9020-f47c563a483a",
                    "819f94ce-a33d-44a2-a44a-e9f03f1abc5f",
                    "68093c7a-fa5a-48d2-9aec-2bdd9398f50f",
                    "29b239f2-5560-490e-95e6-f3c2c2265098",
                    "7ff43e58-6ad9-4252-a0df-78eb5711be44",
                    "8eeae988-0308-4382-8211-ff3fea42881f",
                    "6a106c2a-9f9c-4d87-a5b9-718d1f77a58d",
                    "707a114f-ef80-4fc0-9626-0d2994fd6039",
                    "bdf75812-ec64-43dc-9f0c-9ec97ad27fcc",
                    "14e6f7dd-1fdc-4303-a1e1-21eede54ba1a",
                    "fda458cb-e631-420a-9093-97ddd3a70b2b",
                    "9af1b57b-4506-4ddc-a330-6726c4a8bc79",
                    "2ba2451a-64f9-4719-82dd-d475788f9e13"
                ]
            },
            {
                id: "f77cf6a9-f955-4d2d-a00a-398bdac41eb9",
                name: "Linha Vermelha",
                color: "#ee2b73",
                stations: [
                    "06f3f305-3f25-474e-8f2b-a01ea6dfc8d6",
                    "47d06d4a-83ba-4dc6-9697-d73a8f075df9",
                    "0f3a66d9-3394-4cef-b2c8-6d230ea5a215",
                    "f9efc52f-749c-49a0-aedb-7a9e77ddfa95",
                    "6acbc86b-c001-4f73-aed0-bbe7f99670d8",
                    "d32f6acf-0cc9-4a12-9b5a-2efe85596f11",
                    "68599614-f744-4ba0-8d9a-48284d7ef6c0",
                    "6f06098c-abbb-4908-842d-8e70b6e1bbf6",
                    "0c511c50-3583-422c-9757-933dc2dda286",
                    "8eeae988-0308-4382-8211-ff3fea42881f",
                    "e7673e70-247f-48b1-9326-6b00b9f5178d",
                    "8a7a46ec-2d68-4420-a4e8-dd4fe703539b"
                ]
            }
        ],
        stations: [
            {
                id: "d22c4e06-22b3-40ab-9738-f2c858c866c8",
                name: "Reboleira",
                lat: 38.7522016218644,
                lng: -9.224160264075769
            },
            {
                id: "65686531-978c-439a-8efc-c781e108c19e",
                name: "Amadora Este",
                lat: 38.758438657078,
                lng: -9.21834505489016
            },
            {
                id: "f7d33a65-e4e8-42b7-9453-c498461df87a",
                name: "Alfornelos",
                lat: 38.760326185221864,
                lng: -9.204551952085165
            },
            {
                id: "44ff9f26-c318-445c-8d4f-86109f7ba43b",
                name: "Pontinha",
                lat: 38.762266278988626,
                lng: -9.196978898077651
            },
            {
                id: "83a28772-d932-4ee0-aaaa-c8173173f704",
                name: "Carnide",
                lat: 38.75919030878569,
                lng: -9.19276898414535
            },
            {
                id: "7cf7427a-632b-4d52-8462-285502106d74",
                name: "Colégio Militar/Luz",
                lat: 38.7534239080031,
                lng: -9.18929294779537
            },
            {
                id: "17924e78-43d1-46ec-9706-213a9355ebe2",
                name: "Alto dos Moinhos",
                lat: 38.74993633177476,
                lng: -9.17987469591624
            },
            {
                id: "b500d8ab-98af-4589-9397-e805e454fdba",
                name: "Laranjeiras",
                lat: 38.74829674466613,
                lng: -9.173073478905064
            },
            {
                id: "e7da790d-3115-4c2b-ba67-9cdbf52a5bdb",
                name: "Jardim Zoológico",
                lat: 38.74028391841146,
                lng: -9.166766380677897
            },
            {
                id: "09dfdb43-1da0-41f3-948e-14e7febdd70b",
                name: "Praça de Espanha",
                lat: 38.73770254283682,
                lng: -9.159339222167608
            },
            {
                id: "8a7a46ec-2d68-4420-a4e8-dd4fe703539b",
                name: "São Sebastião",
                lat: 38.73407035436561,
                lng: -9.15397462942318
            },
            {
                id: "7952664e-a682-4373-bd17-75dde8cb759e",
                name: "Parque",
                lat: 38.72981637474679,
                lng: -9.150131961098001
            },
            {
                id: "58e27cac-fb7c-4243-83d2-59f8f1e479fb",
                name: "Marquês de Pombal",
                lat: 38.724687734045474,
                lng: -9.149895973579355
            },
            {
                id: "84648dfb-ea6c-45bd-a817-53921f97c0ab",
                name: "Avenida",
                lat: 38.71905962407437,
                lng: -9.14489858809005
            },
            {
                id: "fd2abf3f-97b8-4967-b594-5b19bb93bcfb",
                name: "Restauradores",
                lat: 38.71537786425548,
                lng: -9.141723483293708
            },
            {
                id: "9af1b57b-4506-4ddc-a330-6726c4a8bc79",
                name: "Baixa-Chiado",
                lat: 38.71014681157733,
                lng: -9.140240483480357
            },
            {
                id: "1fd1760e-1b38-4f6c-929a-accc6d2615de",
                name: "Terreiro do Paço",
                lat: 38.707026554907515,
                lng: -9.134419066132804
            },
            {
                id: "b471d54a-2c49-411e-ab70-bcab9e6c097b",
                name: "Santa Apolónia",
                lat: 38.71368614673103,
                lng: -9.122478032463823
            },
            {
                id: "bb06300b-e6c8-49f6-a3e3-346b4f7a439c",
                name: "Odivelas",
                lat: 38.793279822065344,
                lng: -9.17305975009062
            },
            {
                id: "4f84a87a-d981-4695-9b27-be758ac38a6f",
                name: "Senhor Roubado",
                lat: 38.785638955330775,
                lng: -9.171869897575903
            },
            {
                id: "8f4a2b87-b2a6-4819-aa45-97ab66eee0a5",
                name: "Ameixoeira",
                lat: 38.779650072687524,
                lng: -9.15949889335394
            },
            {
                id: "52b2848d-063e-458e-9389-fbd00ee3eb32",
                name: "Lumiar",
                lat: 38.772942785856394,
                lng: -9.159294960242162
            },
            {
                id: "e3fbf632-1cb4-4d10-bf23-a10eae1cb3de",
                name: "Quinta das Conchas",
                lat: 38.76736399495067,
                lng: -9.155561529837415
            },
            {
                id: "819f94ce-a33d-44a2-a44a-e9f03f1abc5f",
                name: "Campo Grande",
                lat: 38.76017872701325,
                lng: -9.157921605306528
            },
            {
                id: "1d542830-1d75-44fe-91d3-53838a544d11",
                name: "Cidade Universitária",
                lat: 38.75154288986917,
                lng: -9.159123823009157
            },
            {
                id: "e2c08e69-3c55-4d6b-9ba0-23724cebf9e4",
                name: "Entrecampos",
                lat: 38.74704290838142,
                lng: -9.148310447444992
            },
            {
                id: "755f1f4f-6b83-47c7-8421-a62b70476ce9",
                name: "Campo Pequeno",
                lat: 38.74111430636282,
                lng: -9.146816152038317
            },
            {
                id: "e7673e70-247f-48b1-9326-6b00b9f5178d",
                name: "Saldanha",
                lat: 38.734725381066546,
                lng: -9.145271169816402
            },
            {
                id: "d076ade2-ad58-4240-80f5-28b6d283a4cb",
                name: "Picoas",
                lat: 38.73035820951891,
                lng: -9.146936507874017
            },
            {
                id: "0b007489-0650-42fb-aaad-73b1399f94d5",
                name: "Rato",
                lat: 38.719806085875796,
                lng: -9.154138519794314
            },
            {
                id: "355d22cd-863f-4d28-9020-f47c563a483a",
                name: "Telheiras",
                lat: 38.76009892641801,
                lng: -9.166643149740402
            },
            {
                id: "68093c7a-fa5a-48d2-9aec-2bdd9398f50f",
                name: "Alvalade",
                lat: 38.75296380226374,
                lng: -9.14397469370905
            },
            {
                id: "29b239f2-5560-490e-95e6-f3c2c2265098",
                name: "Roma",
                lat: 38.74811089785673,
                lng: -9.141346086261123
            },
            {
                id: "7ff43e58-6ad9-4252-a0df-78eb5711be44",
                name: "Areeiro",
                lat: 38.7422622051429,
                lng: -9.133556697732553
            },
            {
                id: "8eeae988-0308-4382-8211-ff3fea42881f",
                name: "Alameda",
                lat: 38.7371393286177,
                lng: -9.13218354307959
            },
            {
                id: "6a106c2a-9f9c-4d87-a5b9-718d1f77a58d",
                name: "Arroios",
                lat: 38.7326963640697,
                lng: -9.13432893103288
            },
            {
                id: "707a114f-ef80-4fc0-9626-0d2994fd6039",
                name: "Anjos",
                lat: 38.72696301440675,
                lng: -9.13490839897475
            },
            {
                id: "bdf75812-ec64-43dc-9f0c-9ec97ad27fcc",
                name: "Intendente",
                lat: 38.723162806407366,
                lng: -9.13527324119011
            },
            {
                id: "14e6f7dd-1fdc-4303-a1e1-21eede54ba1a",
                name: "Martim Moniz",
                lat: 38.717565104308505,
                lng: -9.135895390102895
            },
            {
                id: "fda458cb-e631-420a-9093-97ddd3a70b2b",
                name: "Rossio",
                lat: 38.71402989464221,
                lng: -9.137976762991796
            },
            {
                id: "2ba2451a-64f9-4719-82dd-d475788f9e13",
                name: "Cais do Sodré",
                lat: 38.706256907242626,
                lng: -9.145061485570617
            },
            {
                id: "06f3f305-3f25-474e-8f2b-a01ea6dfc8d6",
                name: "Aeroporto",
                lat: 38.76865981788869,
                lng: -9.128266972467223
            },
            {
                id: "47d06d4a-83ba-4dc6-9697-d73a8f075df9",
                name: "Encarnação",
                lat: 38.775157095998644,
                lng: -9.115649484133218
            },
            {
                id: "0f3a66d9-3394-4cef-b2c8-6d230ea5a215",
                name: "Moscavide",
                lat: 38.774897278717255,
                lng: -9.103054488975216
            },
            {
                id: "f9efc52f-749c-49a0-aedb-7a9e77ddfa95",
                name: "Oriente",
                lat: 38.76781855382783,
                lng: -9.099990152915657
            },
            {
                id: "6acbc86b-c001-4f73-aed0-bbe7f99670d8",
                name: "Cabo Ruivo",
                lat: 38.762952504023566,
                lng: -9.104105495167753
            },
            {
                id: "d32f6acf-0cc9-4a12-9b5a-2efe85596f11",
                name: "Olivais",
                lat: 38.76086205913751,
                lng: -9.111754386107638
            },
            {
                id: "68599614-f744-4ba0-8d9a-48284d7ef6c0",
                name: "Chelas",
                lat: 38.75484660415642,
                lng: -9.11393271269437
            },
            {
                id: "6f06098c-abbb-4908-842d-8e70b6e1bbf6",
                name: "Bela Vista",
                lat: 38.74754231171439,
                lng: -9.117720077050043
            },
            {
                id: "0c511c50-3583-422c-9757-933dc2dda286",
                name: "Olaias",
                lat: 38.73943665625735,
                lng: -9.123974336488846
            }
        ]
    }

    map: leaflet.Map;

    systems: System[] = [];
    lines: Line[] = [];
    stations: Station[] = [];

    #openLine: (line: Line) => void;
    #openStation: (station: Station) => void;

    constructor(map: leaflet.Map, openLine?: (line: Line) => void, openStation?: (station: Station) => void, error?: () => void){
        
        this.map = map;
        this.map.on('zoomend', ()=>this.render());

        this.#openLine = openLine ? openLine : ()=>{};
        this.#openStation = openStation ? openStation : ()=>{};

        let json = localStorage.getItem('metro');

        if(!json){
            this.load(Metro.DEFAULT);
            return;
        }

        try{
            this.load(JSON.parse(json));
        }catch(e){
            console.error(e);
            localStorage.setItem('errorMetro', json);
            this.load(Metro.DEFAULT);
            if(error) error();
        }

    }

    static unserialize(data: SerializedMetro): { systems: System[], lines: Line[], stations: Station[] } {

        // Type Check

        if(!(

            'systems' in data && data.systems instanceof Array && data.systems.every(system=>(
                'id' in system && typeof system.id === 'string' &&
                'name' in system && typeof system.name === 'string' &&
                'lines' in system && system.lines instanceof Array && system.lines.every(line=>typeof line === 'string')
            )) &&

            'lines' in data && data.lines instanceof Array && data.lines.every(line=>(
                'id' in line && typeof line.id === 'string' &&
                'name' in line && typeof line.name === 'string' &&
                'color' in line && typeof line.color === 'string' &&
                'stations' in line && line.stations instanceof Array && line.stations.every(station=>typeof station === 'string')
            )) &&

            'stations' in data && data.stations instanceof Array && data.stations.every(station=>(
                'id' in station && typeof station.id === 'string' &&
                'name' in station && typeof station.name === 'string' &&
                'lat' in station && typeof station.lat === 'number' &&
                'lng' in station && typeof station.lng === 'number'
            ))

        )) throw new Error('Invalid .metro data!');

        // Init

        let systems: System[] = [];
        let lines: Line[] = [];
        let stations: Station[] = [];

        // Unserialize stations

        for(let { id, name, lat, lng } of data.stations)
            stations.push({ id, name, coords: leaflet.latLng(lat, lng) });

        // Unserialize lines

        for(let { id, name, color, stations: stationIDs } of data.lines){

            let lineStations: Station[] = [];
            
            for(let stationID of stationIDs){
                let station = stations.find(s=>s.id == stationID);
                if(!station) throw new Error(`Couldn't find station "${stationID}" on line "${id}"!`);
                lineStations.push(station);
            }

            lines.push({ id, name, color, stations: lineStations });

        }

        // Unserialize systems

        for(let { id, name, lines: lineIDs } of data.systems){

            let systemLines: Line[] = [];

            for(let lineID of lineIDs){
                let line = lines.find(l=>l.id == lineID);
                if(!line) throw new Error(`Couldn't find line "${lineID}" on system "${id}"!`);
                systemLines.push(line);
            }

            systems.push({ id, name, lines: systemLines });

        }

        return { systems, lines, stations };
    }

    load(data: SerializedMetro){

        let { systems, lines, stations } = Metro.unserialize(data);

        this.systems = systems;
        this.lines = lines;
        this.stations = stations;
        this.save();
        
        this.render();

    }

    #layers: leaflet.Layer[] = [];

    render(){

        let simpleView = this.map.getZoom() <= SIMPLE_VIEW_ZOOM;

        // Clear layers

        for(let layer of this.#layers)
            this.map.removeLayer(layer);
        this.#layers = [];

        // Render unused stations

        if(!simpleView){
            for(let station of this.stations){

                if(this.lines.some(l=>l.stations.some(s=>s.id == station.id))) continue;
    
                let marker = leaflet.circleMarker(station.coords, {
                    color: '#888',
                    fillColor: '#fff',
                    fillOpacity: 1,
                    radius: 5
                }).on('click', ()=>this.#openStation(station)).addTo(this.map);
                this.#layers.push(marker);
    
            }
        }

        // Render lines

        for(let line of this.lines){

            let polyline = leaflet.polyline(line.stations.map(s=>s.coords), {
                color: line.color,
                weight: 10
            }).on('click', ()=>this.#openLine(line)).addTo(this.map);
            this.#layers.push(polyline);

            if(!simpleView){
                for(let station of line.stations){
    
                    let marker = leaflet.circleMarker(station.coords, {
                        color: line.color,
                        fillColor: '#fff',
                        fillOpacity: 1,
                        radius: 5
                    }).on('click', ()=>this.#openStation(station)).addTo(this.map);
                    this.#layers.push(marker);
    
                }
            }

        }

    }

    serialize(): SerializedMetro {
        return {
            systems: this.systems.map(s=>({ id: s.id, name: s.name, lines: s.lines.map(l=>l.id) })),
            lines: this.lines.map(l=>({ id: l.id, name: l.name, color: l.color, stations: l.stations.map(s=>s.id) })),
            stations: this.stations.map(s=>({ id: s.id, name: s.name, lat: s.coords.lat, lng: s.coords.lng }))
        }
    }

    /** Check if there zero systems, zero lines and zero stations. */
    isEmpty(): boolean {
        return (
            this.systems.length == 0 &&
            this.lines.length == 0 &&
            this.stations.length == 0
        );
    }

    /** Saves current data on local storage. */
    save(){
        let data = this.serialize();
        let json = JSON.stringify(data)
        localStorage.setItem('metro', json);
    }

    /** Renders current data and saves it on local storage. */
    update(){
        this.render();
        this.save();
    }

}