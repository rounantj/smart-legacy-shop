export const sellByWeightDefault =
  '{"compraPorPeso":false,"mostrarPeso":false}';

export const urlImageDecide = (imageUrl: string) => {
  return imageUrl
  console.log({ imageUrl })
  if (imageUrl) {
    return "https://api-smart-939610cb57d8.herokuapp.com/pictures_ean" + imageUrl
  } else {
    return "https://api-smart-939610cb57d8.herokuapp.com/images/default/produto-sem-imagem.jpg"
  }
}
