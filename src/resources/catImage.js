import httpRequest from '../server/clientHttpRequest.js';
import { DOMAIN_URL } from './constant.js';

class CatImage {
    #width = 400;
    #height = 500;
    #color = 'Red';
    #size = 100;
    #message = ''

    constructor(width, height, color, size, message) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.size = size;
        this.message = message;
    }

    getCatImage = async () => {
        const url = `${DOMAIN_URL}/${this.message}?width=${this.width}&height=${this.height}&color=${this.color}&size=${this.size}`;

        httpRequest.setMethod('GET');
        httpRequest.setUrl(url);
        
        return httpRequest.callUrl().then(res => res).catch(err => err);
    }

    getSupportedCatImage = async () => {
        let isImageTypeGif = false;
        let catImageContent = await this.getCatImage();

        if(catImageContent.status === 200) {
            const imageType = catImageContent.headers['content-type'];
            isImageTypeGif = (imageType === 'image/gif');

            if(isImageTypeGif) {
                console.log("GIF detected. Hence calling the domain again to get the desired cat image format")
                return this.getSupportedCatImage();
            }

            return catImageContent;
        } 
        
        throw catImageContent.message;
        
    }
}

export default CatImage;
