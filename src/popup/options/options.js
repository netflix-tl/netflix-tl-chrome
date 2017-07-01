import html from './options.html'
import './options.css'

export default function Options() {
    document.getElementsByClassName('options-section')[0].innerHTML = html
    document.getElementsByClassName('main-section')[0].classList.add('left')
    document.getElementsByClassName('options-section')[0].classList.add('left');
    document.getElementsByClassName('back-btn')[0].addEventListener('click', () => {
        console.log('back')
        document.getElementsByClassName('main-section')[0].classList.remove('left')
        document.getElementsByClassName('options-section')[0].classList.remove('left')
        
    })
}