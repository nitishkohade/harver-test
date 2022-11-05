import { writeFile } from 'fs';
import mergeImg from 'merge-img';
import { join } from 'path';

class MergeImage {

    #images;
    #fileName;

    constructor(fileName) {
      this.images = [];
      this.fileName = fileName;
    }

    getImageProps({data, x, y}) {
        return { src: Buffer.from(data, 'binary'), x, y }
    }

    // todo: to make it private
    writeBufferToFile(buffer) {
        const fileOut = join(`${process.cwd()}/catImages/`, this.fileName);
                
        writeFile(fileOut, buffer, 'binary', (err) => {
          if(err) {
            console.log(err);
          }
        })
    }

    addImage(imageProps) {
        this.images.push(this.getImageProps(imageProps));
    }

    async merge() {
        try{
            const img = await mergeImg(this.images);
            img.getBuffer('image/jpeg', (err, buffer) => {
              if (err) {
                throw err;
              }

              this.writeBufferToFile(buffer);
              console.log("The file was saved!");
            });
        } catch(err) {
          throw "For some reason merging didn't work"
        }
    }
}

export default MergeImage;
