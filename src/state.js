import { reactive } from 'vue'


export const state = reactive({
    baseUrl: 'http://localhost:8000/',
    

    imagePath(url) {
        if (url && !url.startsWith('https')) {
            return state.baseUrl + 'storage/' + url
        } else if (url && url.startsWith('https')) {
            return url
        } else {
            return 'https://via.placeholder.com/300x200'
        }
    }, 

})