import html from './options.html'
import css from './options.css'

export default function Options() {
    document.getElementById('alt-page').innerHTML = html
    document.getElementsByClassName('popup-inner')[0].classList.add('popup-inner-scroll')
    document.getElementById('back-btn').addEventListener('click', () => {
        console.log('back')
        document.getElementsByClassName('popup-inner')[0].classList.remove('popup-inner-scroll')
    })
}