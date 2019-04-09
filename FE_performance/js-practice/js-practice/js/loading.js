document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.one').addEventListener('click', function() {
    document.querySelector(
      '.four'
    ).innerText = `Proin aliquet leo nulla. Proin urna est, placerat a nunc sit amet, blandit faucibus dolor. Maecenas sodales semper purus, et sodales tellus. In hac habitasse platea dictumst. Sed feugiat elementum ligula ut congue. Curabitur at sem ut leo gravida mattis. Vestibulum dictum urna nulla, id consequat neque semper eget. Vestibulum tortor neque, aliquam volutpat mollis eu, placerat ut nisl. Sed eros quam, malesuada id tincidunt malesuada, iaculis nec libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed scelerisque faucibus volutpat. Nulla varius imperdiet purus, in gravida sapien. Etiam rhoncus convallis metus vel maximus. Praesent aliquam risus vitae tincidunt vulputate. Integer blandit massa vel mi congue pellentesque. Mauris vehicula congue justo.`;
  });
  document.querySelector('.two').addEventListener('click', function() {
    document.querySelector(
      '.four'
    ).innerText = `Duis gravida ipsum ipsum, sit amet euismod purus scelerisque at. Mauris vestibulum massa dui, vitae aliquet velit fringilla a. Integer at magna egestas, rhoncus ipsum at, vehicula massa. Praesent faucibus nibh eros, eu sagittis elit consectetur ac. Ut at lacus tristique, placerat nibh tincidunt, tempor nibh. Sed nec mollis nulla. Phasellus placerat dui quis sapien scelerisque eleifend sed vel augue. Proin blandit, risus nec laoreet tempor, risus turpis condimentum nisl, et volutpat ex lectus id dui. Fusce in magna tellus. Maecenas viverra iaculis dolor a pharetra.`;
  });
  document.querySelector('.three').addEventListener('click', function() {
    document.querySelector(
      '.four'
    ).innerText = `Sed rutrum risus massa, at semper enim rhoncus ac. Fusce vestibulum orci sed neque euismod, ut ultricies libero mollis. In accumsan imperdiet quam ac pretium. In quis suscipit dolor, ut faucibus massa. Sed iaculis vulputate eros, at rhoncus sapien convallis sed. Phasellus metus mauris, congue non ipsum in, lobortis convallis mauris. Morbi nec diam magna.`;
  });
});
