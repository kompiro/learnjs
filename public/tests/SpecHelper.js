var fixture;
/* global $ */
function loadFixture(path) {  
  var html;
  $.ajax({
    url: '/index.html',
    success: function(result) {
      console.log(result);
      html = result;
    },
    async: false
  });          
  return $.parseHTML(html);
}

function resetFixture() {
  if (!fixture) {
    var index = $('<div>').append(loadFixture('/index.html'));
    var markup = index.find('div.markup');
    fixture = $('<div class="fixture" style="display: none">').append(markup);
    $('body').append(fixture.clone());
  } else {
    $('.fixture').replaceWith(fixture.clone());
  }
}

beforeEach(function () {
  resetFixture();
});
