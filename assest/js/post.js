import { _querySelectorClass, _querySelectorId, _querySelectorAll } from "./functions/getElements.js";
import { todayDate } from "./functions/convertDateTopersion.js";
import ckeditorTemplate from "./functions/ckeditorTemplate.js";
import { insertData, getAllData, getSingleData } from "./functions/fetchData.js";
import { validateForm, resetForm } from "./functions/form.js";
const selectBoxItem = _querySelectorClass('select-box-item')
const categoryBtnLink = _querySelectorClass('category-btns a')
const indexPhotoActiveModal = _querySelectorClass('index-photo a')
const categoryBoxTitle = _querySelectorClass('category-box-title')
const navTabs = _querySelectorClass('nav-tabs')
const uploadImageBtnModal = _querySelectorId('upload-image-btn')
const uploadImageBtn = _querySelectorClass
('upload-image-galley')
const setIndexImageBtn = _querySelectorId('set-index-image-btn')



async function showImagesGalleryInPage() {
  const iamgeBoxContainer = _querySelectorClass('main-content-images-container')
  const imageBoxWrapper = document.createElement('div');
  const imageBoxFragment = document.createDocumentFragment()
  const allImageGalley = await getAllData('gallery')
  imageBoxWrapper.classList.add('main-content-images')
  if (allImageGalley) {
    iamgeBoxContainer.innerHTML = ''
    allImageGalley.forEach(image => {
      imageBoxWrapper.insertAdjacentHTML('beforeend',
        `<figure class="main-content-imgage">
          <img src="${image.srcImage}" alt="" data-target="${image.id}">
          <div class="main-content-image-delete">
              <span>
                  <svg class="icon icon-cancel">
                      <use xlink:href="assest/images/svg/defs.svg#icon-cancel"></use>
                  </svg>
              </span>
          </div>
        </figure>`)
      imageBoxFragment.append(imageBoxWrapper)
    })
    iamgeBoxContainer.append(imageBoxFragment)
  }
}


async function getInfoIndexPhoto() {
  const validateInputs = validateForm('index-photo-form')
  const titleImage = _querySelectorClass('title-image-index')
  const altImage = _querySelectorClass('alt-image-index')
  const descriptionImage = _querySelectorClass('description-image-index')
  const targetImage = _querySelectorClass('image-box.active img')
  const titleImageValue = titleImage.value
  const altImageValue = altImage.value
  const descriptionImageValue = descriptionImage.value
  if (validateInputs && targetImage) {
    let targetImageId = targetImage.dataset.target
    const srcImageTarget = await getSingleData('gallery', targetImageId)

    let infoIndexImage = {
      id: targetImageId,
      title: titleImageValue,
      alt: altImageValue,
      description: descriptionImageValue,
      srcImage: srcImageTarget[0].srcImage
    }

    return infoIndexImage
  } else {
    return false
  }
}


async function showIndexImage(infoIndexImage) {
  const indexImageWrapper = _querySelectorClass('aside-left-content-image-box')
  console.log(infoIndexImage);
  indexImageWrapper.insertAdjacentHTML('beforeend',
    `<img src="${infoIndexImage.srcImage}" alt="" srcset="" data-target="${infoIndexImage.id}">
  <div class="aside-left-image-delete">
      <span>
          <svg class="icon icon-cancel">
              <use xlink:href="assest/images/svg/defs.svg#icon-cancel"></use>
          </svg>
      </span>
  </div>`)
}

async function setImageIndexFun(event) {
  event.preventDefault()
  const infoIndexImage = await getInfoIndexPhoto()
  const modalIndexPhoto = _querySelectorId('modal-index-photo')
  const IndexPhoto = _querySelectorClass('image-box.active')

  if (infoIndexImage) {
    Swal.fire({
      title: 'موفقیت آمیز!',
      text: "عکس شاخص با موفقیت انتخاب شد",
      icon: 'success',
      confirmButtonText: 'باشه'
    })
    resetForm('index-photo-form')
    modalIndexPhoto.classList.remove('active')
    IndexPhoto.classList.remove('active')
    showIndexImage(infoIndexImage)
  } else {
    Swal.fire(
      {
        title: 'خطا!',
        text: "لطفا عکس را انتخاب و تمام موارد را پر کنید",
        icon: 'error',
        confirmButtonText: 'باشه'
      }
    )
  }

}

async function showImagesGalleryModal() {
  const iamgeBoxContainer = _querySelectorClass('image-box-container')
  const imageBoxWrapper = document.createElement('div');
  const imageBoxFragment = document.createDocumentFragment()
  const allImageGalley = await getAllData('gallery')
  imageBoxWrapper.classList.add('images-box')
  if (allImageGalley) {
    iamgeBoxContainer.innerHTML = ''
    allImageGalley.forEach(image => {
      imageBoxWrapper.insertAdjacentHTML('beforeend',
        ` <figure class="image-box">
          <img src="${image.srcImage}" alt="" data-target="${image.id}">
          </figure>`)
      imageBoxFragment.append(imageBoxWrapper)
    })
    iamgeBoxContainer.append(imageBoxFragment)
  }
  const imagesBox = _querySelectorClass('images-box')
  imagesBox.addEventListener('click', (event) => {
    const beforeTargetElem = _querySelectorClass('image-box.active')
    const targetBox = event.target.tagName == 'IMG' ? event.target.parentElement : event.target
    beforeTargetElem ? beforeTargetElem.classList.remove('active') : null
    targetBox.classList.add('active')
  })

}


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
  if (!targetFile) return false
  fileReader.readAsDataURL(targetFile)
  fileReader.onload = async function (event) {
    const result = { 'srcImage': event.target.result }
    const reusltFetch = await insertData('gallery', result)
    if (reusltFetch) {
      Swal.fire(
        'موفقیت آمیز!',
        'عکس با موفقیت به گالری اضافه شد',
        'success'
      )
      showImagesGalleryModal()
      showImagesGalleryInPage()

    }
  }
}

function loadPage() {
  updateTime()
  showImagesGalleryModal()
  showImagesGalleryInPage()

}

window.addEventListener('load', loadPage)
selectBoxItem.addEventListener('click', activeSelectBox)
categoryBtnLink.addEventListener('click', showFormAddCategory)
indexPhotoActiveModal.addEventListener('click', showModalIndexPhoto)
categoryBoxTitle.addEventListener('click', activeTabCategory)
navTabs.addEventListener('click', activeModalTab)
uploadImageBtnModal.addEventListener('change', uploadImage)
uploadImageBtn.addEventListener('change', uploadImage)
setIndexImageBtn.addEventListener('click', setImageIndexFun)