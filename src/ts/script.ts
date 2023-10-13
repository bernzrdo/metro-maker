import leaflet from 'leaflet';
import Sortable from 'sortablejs';
import { v4 as uuid } from 'uuid';
import { Line, Metro, SerializedMetro, Station, System } from './_data';
import { getAddress, getRelevantName } from './_addressUtils';
import { alert, confirm, openDialog } from './_dialog';

const map = leaflet.map('map');
map.setView([39.2361, -8.6869], 11);

leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
}).addTo(map);

const metro = new Metro(map, openLine, openStation, ()=>alert('Unfortunately, we were unable to load your saved data. Please contact our support team to try to recover your data. We apologize for the inconvenience.'));

function pluralize(amount: number, singular: string, plural: string){
    return `${amount} ${amount == 1 ? singular : plural}`;
}

for(let $select of document.querySelectorAll('.select .selected')){
    $select.addEventListener('click', ()=>$select.parentElement!.classList.toggle('off'));
}

function renderOption(name: string, click: () => void, parent: HTMLElement){

    const $item = document.createElement('div');
    $item.classList.add('item');
    $item.innerText = name;
    $item.addEventListener('click', click);
    parent.querySelector('.select .options')!.appendChild($item);

}

// ----- SYSTEMS -----

function renderSystem(system: System, focus: boolean = false){

    const $item = document.createElement('div');
    $item.classList.add('item');

        const $info = document.createElement('div');
        $info.classList.add('info');

            const $name = document.createElement('input');
            $name.classList.add('name');
            $name.value = system.name;
            $name.addEventListener('input', ()=>{
                system.name = $name.value;
                metro.update();
            });
            $info.appendChild($name);

            const $stats = document.createElement('div');
            $stats.classList.add('stats');
            $stats.innerText = `${
                pluralize(system.lines.length, 'line', 'lines')
            }, ${
                pluralize(system.lines.reduce((a,b)=>a+b.stations.length, 0), 'station', 'stations')
            }`
            $info.appendChild($stats);

        $item.appendChild($info);

        const $editBtn = document.createElement('button');
        $editBtn.classList.add('edit-btn');
        $editBtn.innerHTML = '<span class="material-symbols-outlined fill">edit</span>';
        $editBtn.addEventListener('click', ()=>$name.focus());
        $item.appendChild($editBtn);

        const $deleteBtn = document.createElement('button');
        $deleteBtn.classList.add('delete-btn');
        $deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';
        $deleteBtn.addEventListener('click', async ()=>{

            if(!await confirm('This action will delete the system, its lines and stations!')) return;

            let stationIDs = system.lines.map(l=>l.stations).flat(1).map(s=>s.id);
            metro.stations = metro.stations.filter(s=>!stationIDs.includes(s.id));

            let lineIDs = system.lines.map(l=>l.id);
            metro.lines = metro.lines.filter(l=>!lineIDs.includes(l.id));

            metro.systems = metro.systems.filter(s=>s.id != system.id);

            metro.update();
            $item.remove();
            
        });
        $item.appendChild($deleteBtn);

    $systemsList.insertBefore($item, $systemsList.querySelector('.add-item')!);

    if(focus) $name.focus();

}

const $systems: HTMLDialogElement = document.querySelector('#systems')!;
const $systemsBtn: HTMLButtonElement = document.querySelector('.systems-btn')!;
const $systemsList: HTMLDivElement = $systems.querySelector('.list')!;
$systemsBtn.addEventListener('click', ()=>{
    
    for(let $system of $systemsList.querySelectorAll('.item'))
        $system.remove();

    for(let system of metro.systems)
        renderSystem(system);

    openDialog($systems);
});

const $addSystemBtn: HTMLDivElement = $systems.querySelector('.add-item')!;
$addSystemBtn.addEventListener('click', ()=>{

    let system: System = {
        id: uuid(),
        name: '',
        lines: []
    }
    
    metro.systems.push(system);
    renderSystem(system, true);
    metro.update();

});

// ----- LINES -----

function renderLine(line: Line){

    const $item = document.createElement('div');
    $item.classList.add('clickable', 'item');
    $item.addEventListener('click', ()=>openLine(line));

        const $color = document.createElement('div');
        $color.classList.add('color');
        $color.style.backgroundColor = line.color;
        $item.appendChild($color);

        const $info = document.createElement('div');
        $info.classList.add('info');

            const $name = document.createElement('div');
            $name.classList.add('name');
            $name.innerText = line.name;
            $info.appendChild($name);

            const $stats = document.createElement('div');
            $stats.classList.add('stats');
            $stats.innerText = pluralize(line.stations.length, 'estação', 'estações');
            $info.appendChild($stats);

        $item.appendChild($info);

        $item.innerHTML += '<span class="material-symbols-outlined">chevron_right</span>';

    $linesList.insertBefore($item, $addLineBtn);

}

function renderLines(){
    if(!selectedLinesSystem) return;

    for(let $line of $linesList.querySelectorAll('.item'))
        $line.remove();

    for(let line of selectedLinesSystem!.lines)
        renderLine(line);

}

let selectedLinesSystem: System | null;
function renderLinesSelectedSystem(){

    // Selected Name

    const $name: HTMLDivElement = $lines.querySelector('.select .selected .name')!;
    $name.innerText = selectedLinesSystem!.name;

    // Update options

    for(let $item of $lines.querySelectorAll('.select .options .item'))
        $item.remove();

    for(let system of metro.systems.filter(s=>s.id != selectedLinesSystem!.id))
        renderOption(system.name, ()=>{
            selectedLinesSystem = system;
            $lines.querySelector('.select')!.classList.add('off');
            setTimeout(renderLinesSelectedSystem);
        }, $lines);

    renderLines();

}

const $lines: HTMLDialogElement = document.querySelector('#lines')!;
const $linesBtn: HTMLButtonElement = document.querySelector('.lines-btn')!;
const $linesList: HTMLDivElement = $lines.querySelector('.list')!;
$linesBtn.addEventListener('click', ()=>{
    
    if(metro.systems.length == 0){
        alert('Please add a system first!');
        return;
    }

    [selectedLinesSystem] = metro.systems;
    renderLinesSelectedSystem();
    
    openDialog($lines);
});

const $addLineBtn: HTMLDivElement = $lines.querySelector('.add-item')!;
$addLineBtn.addEventListener('click', ()=>{

    let line: Line = {
        id: uuid(),
        color: '#888',
        name: '',
        stations: []
    }

    metro.lines.push(line);
    selectedLinesSystem!.lines.push(line);
    renderLine(line);
    openLine(line);
    metro.update();

});

const $line: HTMLDialogElement = document.querySelector('#line')!;
const $lineColor: HTMLInputElement = $line.querySelector('.color input')!;
const $lineName: HTMLInputElement = $line.querySelector('.name')!;
const $lineEditBtn: HTMLButtonElement = $line.querySelector('.edit-btn')!;
const $lineDeleteBtn: HTMLButtonElement = $line.querySelector('.delete-btn')!;
const $lineStations: HTMLDivElement = $line.querySelector('.stations')!;

function findFirstIntersection(line: Line, station: Station){
    return metro.lines.find(l=>l.id != line.id && l.stations.some(s=>s.id == station.id));
}

function renderLineStation(line: Line, station: Station){

    const $station = document.createElement('div');
    $station.classList.add('station');
    $station.dataset.id = station.id;

        let intersection = findFirstIntersection(line, station);
        if(intersection){
            
            const $intersection = document.createElement('div');
            $intersection.classList.add('intersection');
            $intersection.style.backgroundColor = intersection.color;
            $station.appendChild($intersection);

        }

        $station.innerHTML += '<div class="handle"></div>';

        const $name = document.createElement('div');
        $name.classList.add('name');
        $name.innerText = station.name;
        $name.addEventListener('click', ()=>openStation(station));
        $station.appendChild($name);

    $lineStations.appendChild($station);

}

function renderLineStations(){
    if(!currentLine) return;

    for(let $station of $lineStations.querySelectorAll('.station'))
        $station.remove();

    for(let station of currentLine.stations)
        renderLineStation(currentLine, station);

}

let currentLine: Line | null;
function openLine(line: Line){

    preventNewStation = true;
    setTimeout(()=>preventNewStation = false, 100);

    currentLine = line;

    $line.style.setProperty('--color', line.color);
    $lineColor.value = line.color;
    $lineName.value = line.name;

    renderLineStations();

    openDialog($line);

}

$lineColor.addEventListener('input', ()=>{
    $line.style.setProperty('--color', $lineColor.value);
    currentLine!.color = $lineColor.value;
    renderLines();
    metro.update();
});

$lineName.addEventListener('input', ()=>{
    currentLine!.name = $lineName.value;
    renderLines();
    metro.save();
});

$lineEditBtn.addEventListener('click', ()=>$lineName.focus());

$lineDeleteBtn.addEventListener('click', async ()=>{

    if(!await confirm('This action will delete the line and its stations!')) return;

    let stationIDs = currentLine!.stations.filter(s=>!findFirstIntersection(currentLine!, s)).map(s=>s.id);
    metro.stations = metro.stations.filter(s=>!stationIDs.includes(s.id));

    metro.lines = metro.lines.filter(l=>l.id != currentLine!.id);

    let system = metro.systems.find(s=>s.lines.some(l=>l.id == currentLine!.id))!;
    system.lines = system.lines.filter(l=>l.id != currentLine!.id);

    metro.update();
    renderLines();
    $line.close();

});

new Sortable($lineStations, {
    handle: '.handle',
    animation: 150,
    onSort: ()=>{

        currentLine!.stations = [...$lineStations.children].map(e=>{
            let {id} = (e as HTMLDivElement).dataset;
            return metro.stations.find(s=>s.id == id)!;
        });
        metro.update();

    }
});

// ----- STATIONS -----

function renderStation(station: Station){

    const $item = document.createElement('div');
    $item.classList.add('clickable', 'item');
    $item.addEventListener('click', ()=>openStation(station));

        const $color = document.createElement('div');
        $color.classList.add('color');

            let lines: Line[] = metro.lines.filter(l=>l.stations.some(s=>s.id == station.id));

            for(let { color } of lines){
                let $line = document.createElement('div');
                $line.style.backgroundColor = color;
                $color.appendChild($line);
            }

            if(lines.length == 0){
                let $line = document.createElement('div');
                $line.style.backgroundColor = '#333';
                $color.appendChild($line);
            }

        $item.appendChild($color);

        const $info = document.createElement('div');
        $info.classList.add('info');

            const $name = document.createElement('div');
            $name.classList.add('name');
            $name.innerText = station.name;
            $info.appendChild($name);

            const $stats = document.createElement('div');
            $stats.classList.add('stats');
            let system = lines.length > 0 ? metro.systems.find(s=>s.lines.some(l=>l.id == lines[0].id)) : null;
            $stats.innerText = system?.name ?? 'Unused station';
            $info.appendChild($stats);

        $item.appendChild($info);

        $item.innerHTML += '<span class="material-symbols-outlined">chevron_right</span>';

    $stationsList.appendChild($item);

}

function renderStations(){

    let bounds = map.getBounds();
    
    for(let $line of $stationsList.querySelectorAll('.item'))
        $line.remove();

    for(let station of metro.stations){
        if(bounds.contains(station.coords)) renderStation(station);
    }

}

const $stations: HTMLDialogElement = document.querySelector('#stations')!;
const $stationsBtn: HTMLButtonElement = document.querySelector('.stations-btn')!;
const $stationsList: HTMLDivElement = $stations.querySelector('.list')!;
$stationsBtn.addEventListener('click', ()=>{
    renderStations();
    openDialog($stations);
});

const $station: HTMLDialogElement = document.querySelector('#station')!;
const $stationName: HTMLInputElement = $station.querySelector('.name')!;
const $stationEditBtn: HTMLButtonElement = $station.querySelector('.edit-btn')!;
const $stationDeleteBtn: HTMLButtonElement = $station.querySelector('.delete-btn')!;
const $stationLines: HTMLDivElement = $station.querySelector('.lines')!;

let currentStation: Station | null;
function openStation(station: Station){

    preventNewStation = true;
    setTimeout(()=>preventNewStation = false, 100);

    if(metro.systems.length == 0){
        alert('Please add a system first!');
        return;
    }
    
    currentStation = station;

    $stationName.value = station.name;

    let line = metro.lines.find(l=>l.stations.some(s=>s.id == station.id));
    if(line)
        selectedStationSystem = metro.systems.find(s=>s.lines.some(l=>l.id == line!.id))!;
    else
        [selectedStationSystem] = metro.systems;

    renderStationSelectedSystem();

    openDialog($station);
}

$stationName.addEventListener('input', ()=>{
    currentStation!.name = $stationName.value;
    renderStations();
    metro.save();
});

$stationEditBtn.addEventListener('click', ()=>$stationName.focus());

$stationDeleteBtn.addEventListener('click', async ()=>{

    if(!await confirm('This action will delete this station!')) return;

    for(let line of metro.lines)
        line.stations = line.stations.filter(s=>s.id != currentStation!.id);

    metro.stations = metro.stations.filter(s=>s.id != currentStation!.id);

    metro.update();
    renderStations();
    $station.close();

});

function renderStationLine(line: Line){

    const $label = document.createElement('label');
    $label.style.setProperty('--color', line.color);
    
        const $checkbox = document.createElement('input');
        $checkbox.type = 'checkbox';
        $checkbox.checked = line.stations.some(s=>s.id == currentStation!.id);
        $checkbox.addEventListener('change', ()=>{
            
            if($checkbox.checked)
                line.stations.push(currentStation!);
            else
                line.stations = line.stations.filter(s=>s.id != currentStation!.id);

            renderLineStations();
            renderStations();
            metro.update();

        });
        $label.appendChild($checkbox);

        const $name = document.createTextNode(line.name);
        $label.appendChild($name);

    $stationLines.appendChild($label);

}

function renderStationLines(){

    for(let $line of $stationLines.querySelectorAll('label'))
        $line.remove();

    for(let line of selectedStationSystem!.lines)
        renderStationLine(line);

}

let selectedStationSystem: System | null;
function renderStationSelectedSystem(){

    // Selected Name

    const $name: HTMLDivElement = $station.querySelector('.select .selected .name')!;
    $name.innerText = selectedStationSystem!.name;

    // Update options

    for(let $item of $station.querySelectorAll('.select .options .item'))
        $item.remove();

    for(let system of metro.systems.filter(s=>s.id != selectedStationSystem!.id))
        renderOption(system.name, ()=>{

            selectedStationSystem = system;

            // Remove from every line when switching systems
            for(let line of metro.lines)
                line.stations = line.stations.filter(s=>s.id != currentStation!.id);
    
            $station.querySelector('.select')!.classList.add('off');
            setTimeout(renderStationSelectedSystem);
        }, $station);

    renderStationLines();

}

// ----- DOWNLOAD -----

const $downloadBtn: HTMLButtonElement = document.querySelector('.download-btn')!;
$downloadBtn.addEventListener('click', async ()=>{

    let data = metro.serialize();
    let json = JSON.stringify(data);
    let blob = new Blob([json], { type: 'octet/stream' });
    let url = URL.createObjectURL(blob);

    const now = new Date();

    const $a = document.createElement('a');
    $a.href = url;
    $a.download = `${
        now.getFullYear()
    }-${(now.getMonth() + 1).toString().padStart(2, '0')
    }-${now.getDate().toString().padStart(2, '0')
    } ${now.getHours().toString().padStart(2, '0')
    }h${now.getMinutes().toString().padStart(2, '0')
    }m${now.getSeconds().toString().padStart(2, '0')
    }s.metro`;
    $a.click();
    $a.remove();
    URL.revokeObjectURL(url);

});

// ----- UPLOAD -----

async function askForMetroFile(): Promise<SerializedMetro | null> {
    return new Promise(res=>{

        const $input = document.createElement('input');
        $input.type = 'file';
        $input.accept = '.metro';
        $input.click();
    
        $input.addEventListener('change', ()=>{
    
            let [file] = $input.files!;
            
            let fr = new FileReader();
            fr.addEventListener('load', ()=>{

                $input.remove();

                try{

                    let data = JSON.parse(fr.result as string);
                    Metro.unserialize(data);
                    res(data);
                    
                }catch(e){

                    console.error(e);

                    if((e as Error).message.startsWith('Couldn\'t find')){
                        alert(`"${file.name}" is corrupted!`);
                    }else{
                        alert(`"${file.name}" is not a valid .metro file!`);
                    }

                    res(null);
                }

                

            });
            fr.addEventListener('error', e=>{
                console.error(e);
                alert('An error ocurred while trying to read your .metro file!');
                $input.remove();
                res(null);
            });
            fr.readAsText(file);
    
        });
        $input.addEventListener('cancel', ()=>{
            $input.remove();
            res(null);
        });

    });
}

const $uploadBtn: HTMLButtonElement = document.querySelector('.upload-btn')!;
$uploadBtn.addEventListener('click', async ()=>{

    if(!metro.isEmpty())
        if(!await confirm('This action will replace every system, every line and every station.')) return;

    let data = await askForMetroFile();
    if(!data) return;
    
    metro.load(data);

});

// ----- RESET -----

const $resetBtn: HTMLButtonElement = document.querySelector('.reset-btn')!;
$resetBtn.addEventListener('click', async ()=>{

    if(!metro.isEmpty())
        if(!await confirm('This action will reset every system, every line and every station.')) return;

    metro.load(Metro.DEFAULT);

});

// ----- LINKS -----

const $codeBtn: HTMLButtonElement = document.querySelector('.code-btn')!;
$codeBtn.addEventListener('click', ()=>open('https://github.com/bernzrdo/metro-maker'));

const $feedbackBtn: HTMLButtonElement = document.querySelector('.feedback-btn')!;
$feedbackBtn.addEventListener('click', ()=>open('https://form.typeform.com/to/waX1PInR'));


// ----- CLICK ON MAP -----

let preventNewStation = false;
map.on('click', async e=>{
    if(preventNewStation) return;

    if(metro.systems.length == 0){
        alert('Please add a system first!');
        return;
    }

    let defaultName = '';
    
    let address = await getAddress(e.latlng);
    if(address) defaultName = getRelevantName(address) ?? '';

    let station: Station = {
        id: uuid(),
        name: defaultName,
        coords: e.latlng
    }

    metro.stations.push(station);
    openStation(station);
    metro.update();

});

