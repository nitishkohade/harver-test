import CatImage from './resources/catImage.js';
import MergeImage from './utils/mergeImageUtil.js';

try{

    const width = 400;
    const height = 500;
    let imageXCoordinate = 0;

    const catImage1 = new CatImage(width, height, 'Red', 100, 'Hello, How are you!');
    const catImage2 = new CatImage(width, height, 'Blue', 150, 'I am good');
    const catImage3 = new CatImage(width, height, 'Pink', 150, 'But I am not');

    const getAllCatImages = await Promise.all([
        catImage1.getSupportedCatImage(),
        catImage2.getSupportedCatImage(),
        catImage3.getSupportedCatImage()
    ]);

    const mergeImage = new MergeImage('cat-Images.jpg');

    getAllCatImages.forEach(({data}) => {
        mergeImage.addImage({ data, x: imageXCoordinate, y:0 });
        imageXCoordinate = imageXCoordinate + width;
    })

    await mergeImage.merge();

} catch(err) {
    console.log(err);
}
