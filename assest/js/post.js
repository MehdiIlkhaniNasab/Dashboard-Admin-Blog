import { _querySelectorClass, _querySelectorId, _querySelectorAll } from "./functions/getElements.js";
import { todayDate } from "./functions/convertDateTopersion.js";
import ckeditorTemplate from "./functions/ckeditorTemplate.js";
import { insertData } from "./functions/fetchData.js";
const selectBoxItem = _querySelectorClass('select-box-item')
const categoryBtnLink = _querySelectorClass('category-btns a')
const indexPhotoActiveModal = _querySelectorClass('index-photo a')
const categoryBoxTitle = _querySelectorClass('category-box-title')
const navTabs = _querySelectorClass('nav-tabs')
const imagesBox = _querySelectorClass('images-box')
const uploadImageBtn = _querySelectorId('upload-image-btn')






function updateTime() {
  getDate()
  getTime()
}

function getDate() {
  const daySpan = _querySelectorClass('day')
  const monthSpan = _querySelectorClass('month')
  const yearSpan = _querySelectorClass('year')

  daySpan.innerHTML = todayDate.day
  monthSpan.innerHTML = todayDate.month
  yearSpan.innerHTML = todayDate.year
}

function getTime() {
  const secondSpan = _querySelectorClass('second')
  const minuteSpan = _querySelectorClass('minute')
  const hourSpan = _querySelectorClass('hour')

  setInterval(function () {
    let dateSaver = new Date();
    let hours = dateSaver.getHours();
    let minutes = dateSaver.getMinutes();
    let seconds = dateSaver.getSeconds();

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    hourSpan.innerHTML = hours;
    minuteSpan.innerHTML = minutes;
    secondSpan.innerHTML = seconds;
  }, 1000);


}

function activeSelectBox(event) {
  const subMenu = _querySelectorClass('select-box-menu')
  const selectBoxMenuItem = _querySelectorAll('select-box-menu-item')
  subMenu.classList.toggle('active')
  console.log(selectBoxMenuItem);
  selectBoxMenuItem.forEach(item => {
    item.addEventListener('click', selectTargetItem)
  });
}

function selectTargetItem(event) {
  const subMenu = _querySelectorClass('select-box-menu')
  const targetSelectItem = event.target.tagName == 'SPAN' ? event.target.parentElement : event.target
  const targetElem = _querySelectorId(targetSelectItem.dataset.target)
  const selectBoxValue = _querySelectorClass('select-box-value')
  selectBoxValue.innerHTML = targetElem.innerHTML
  subMenu.classList.remove('active')
}

function showFormAddCategory(event) {
  event.preventDefault()
  const categoryFormAdd = _querySelectorClass('category-form-add')
  let isActive = categoryFormAdd.classList.toggle('active')
  isActive ? event.target.innerHTML = 'بستن پنجره' : event.target.innerHTML = 'دسته بندی جدید'
}

function showModalIndexPhoto(event) {
  event.preventDefault()
  const modalIndexPhoto = _querySelectorId('modal-index-photo')
  modalIndexPhoto.classList.add('active')
  window.scrollTo(0, 0)
  const modalCloseSpan = _querySelectorClass('modal-close')

  modalCloseSpan.addEventListener('click', () => {
    modalIndexPhoto.classList.remove('active')
  })
}

function activeTabCategory(event) {
  event.preventDefault()
  const targetElem = event.target;
  if (targetElem.tagName == 'A') {
    const beforeTargetElem = _querySelectorClass('category-box-title a.active')
    const beforeContentTab = _querySelectorClass('category-list.active')
    const targetContentTabId = targetElem.dataset.target;
    const targetContentTab = _querySelectorId(targetContentTabId)
    beforeTargetElem ? beforeTargetElem.classList.remove('active') : null
    beforeContentTab ? beforeContentTab.classList.remove('active') : null
    targetElem.classList.add('active')
    targetContentTab.classList.add('active')

  }
}

function activeModalTab(event) {
  const targetTab = event.target.tagName == 'A' ? event.target.parentElement : event.target


  if (targetTab.tagName == 'LI') {
    const targetContentTabId = targetTab.dataset.target
    const beforeTargetElem = _querySelectorClass('nav-tabs li.active')
    const beforeContentTab = _querySelectorClass('tab-content .tab-pane.active')
    const targetContentTab = _querySelectorId(targetContentTabId)

    beforeTargetElem ? beforeTargetElem.classList.remove('active') : null
    beforeContentTab ? beforeContentTab.classList.remove('active') : null
    targetTab.classList.add('active')
    targetContentTab.classList.add('active')

  }
}


 function uploadImage(event) {
  const fileReader = new FileReader();
  const targetFile = event.target.files[0]
  if(!targetFile) return false
  fileReader.readAsDataURL(targetFile)
  fileReader.onload = async function(event){
    const result = {'srcImage': event.target.result}
    const reusltFetch = await insertData('gallery', result)
    console.log(reusltFetch);
    if(reusltFetch){
      Swal.fire(
        'موفقیت آمیز!',
        'عکس با موفقیت به گالری اضافه شد',
        'success'
      )
    }
  }
}

updateTime()
selectBoxItem.addEventListener('click', activeSelectBox)
categoryBtnLink.addEventListener('click', showFormAddCategory)
indexPhotoActiveModal.addEventListener('click', showModalIndexPhoto)
categoryBoxTitle.addEventListener('click', activeTabCategory)
navTabs.addEventListener('click', activeModalTab)
uploadImageBtn.addEventListener('change', uploadImage)
imagesBox.addEventListener('click', (event) => {
  const beforeTargetElem = _querySelectorClass('image-box.active')
  const targetBox = event.target.tagName == 'IMG' ? event.target.parentElement : event.target
  beforeTargetElem ? beforeTargetElem.classList.remove('active') : null
  targetBox.classList.add('active')
})
