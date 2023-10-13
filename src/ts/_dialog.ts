
function clickOutside(this: HTMLDialogElement, e: MouseEvent){

    let { top, bottom, left, right } = this.getBoundingClientRect();

    if(
        e.clientX < left ||
        e.clientX > right ||
        e.clientY < top ||
        e.clientY > bottom
    ) this.close();

}

function closeCheck(this: HTMLDialogElement){

    if(this.returnValue == 'closed'){
        this.returnValue = '';
        return;
    }

    for(let $select of this.querySelectorAll('.select')){
        $select.classList.add('off');
    }

    this.showModal();
    this.classList.add('off');
    setTimeout(()=>{
        this.style.display = 'none';
        this.close('closed');
    }, 500)

}

for(let $dialog of document.querySelectorAll('dialog')){

    $dialog.style.display = 'none';
    $dialog.classList.add('off');

    $dialog.addEventListener('click', clickOutside);
    $dialog.addEventListener('close', closeCheck);

    for(let $closeBtn of $dialog.querySelectorAll('.close-btn')){
        $closeBtn.addEventListener('click', ()=>$dialog.close());
    }

}

export function openDialog(dialog: HTMLDialogElement){
    dialog.style.removeProperty('display');
    dialog.showModal();
    dialog.classList.remove('off');
}

// ----- ALERT -----

const $alert: HTMLDialogElement = document.querySelector('#alert')!;
const $alertMsg: HTMLDivElement = $alert.querySelector('.message')!;
const $okBtn: HTMLButtonElement = $alert.querySelector('.ok-btn')!;

export function alert(message: string){
    $alertMsg.innerText = message;
    openDialog($alert);
}

$okBtn.addEventListener('click', ()=>$alert.close());

// ----- CONFIRM -----

const $confirm: HTMLDialogElement = document.querySelector('#confirm')!;
const $confirmMsg: HTMLDivElement = $confirm.querySelector('.message')!;
const $yesBtn: HTMLButtonElement = $confirm.querySelector('.yes-btn')!;
const $noBtn: HTMLButtonElement = $confirm.querySelector('.no-btn')!;

export async function confirm(message: string): Promise<boolean> {
    return new Promise(res=>{

        function yes(){
            $yesBtn.removeEventListener('click', yes);
            $noBtn.removeEventListener('click', no);
            $confirm.removeEventListener('close', no);
            $confirm.close();
            res(true);
        }

        function no(){
            $yesBtn.removeEventListener('click', yes);
            $noBtn.removeEventListener('click', no);
            $confirm.removeEventListener('close', no);
            $confirm.close();
            res(false);
        }

        $yesBtn.addEventListener('click', yes);
        $noBtn.addEventListener('click', no);
        $confirm.addEventListener('close', no);

        $confirmMsg.innerText = message;

        openDialog($confirm);

    });
}