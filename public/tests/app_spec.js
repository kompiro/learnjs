/* global learnjs, expect, $, spyOn */
describe('LearnJS', function() {

  describe('routing', function() {
    it('shows the landing page view when there is no hash', function() {
      learnjs.showView('');
      expect($('.view-container .landing-view').length).toEqual(1);
    });

    it('shows the landing page view when there is only hash', function() {
      learnjs.showView('#');
      expect($('.view-container .landing-view').length).toEqual(1);
    });

    it('shows the problem view', function() {
      learnjs.showView('#problem-1');
      expect($('.view-container .problem-view').length).toEqual(1);
    });

    it('passes the hash view parameter to the view function', function() {
      spyOn(learnjs, 'problemView');
      learnjs.showView('#problem-42');
      expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });
  });

  it('invokes the router when loaded', function() {
    spyOn(learnjs, 'showView');
    learnjs.appOnReady();
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  it('subscribes to the hash change event', function() {
    learnjs.appOnReady();
    spyOn(learnjs, 'showView');
    $(window).trigger('hashchange');
    expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
  });

  describe('problem view', function() {
    var view;
    beforeEach(function(){
      view = learnjs.problemView('1');
    });
    it('has a title that includes the problem number', function() {
      expect(view.find('.title').text().trim()).toEqual('Problem #1');
    });
    it('has a description that applied by data', function() {
      expect(view.find('p').text().trim()).toEqual('What is truth?');
    });
    it('has a code that applied by data', function() {
      expect(view.find('code').text().trim()).toEqual('function problem() { return __; }');
    });

    describe('answer section', function() {
      it('can check a correct answer by hitting a button', function() {
        view.find('.answer').val('true');
        view.find('.check-btn').click();
        expect(view.find('.result span').text()).toEqual('Correct!');
        expect(view.find('.result a').text()).toEqual('Next Problem');
      });
      it('rejects an incorrect answer', function() {
        view.find('.answer').val('false');
        view.find('.check-btn').click();
        expect(view.find('.result').text()).toEqual('Incorrect!');
      });
    });
  });
});