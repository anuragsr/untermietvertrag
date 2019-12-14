app.controller('HomeCtrl', function($scope, $compile, $timeout, utils){
  var clipboard = new ClipboardJS('.ctn-link .desc, .inner.link')

  clipboard.on('success', function(e) {
    e.clearSelection()
    alert('In die Zwischenablage kopiert - ' + e.text)
  })

  clipboard.on('error', function(e) {
    alert('Beim Kopieren ist ein Fehler aufgetreten, bitte manuell kopieren.')
  })

  var s = $scope
  s.pages = [
    {
      title: 'Unter Mietvertrag',
      tpl: 'templates/page1.html',
      fields: [
        { r: 0, p: 'Viola Vorlage,', v: '', id:'f0' },
        { r: 0, p: 'Beispiel-Allee 11,', v: '', id:'f1' },
        { r: 0, p: '12345 Musterdorf', v: '', id:'f2' },
        { r: 0, p: 'Vorname Nachname,', v: '', id:'f3' },
        { r: 0, p: 'Beispiel Strasse X,', v: '', id:'f4' },
        { r: 0, p: '12345 Musterdorf', v: '', id:'f5' },
        { r: 0, p: 'Beispiel-Allee 11', v: '', id:'f6' },
        { r: 0, p: '12345 Musterdorf', v: '', id:'f7' },
        { r: 0, p: '[EINGABEN EINFÜGEN]', v: '', id:'f8' },
        { r: 0, p: '3 Zimmern, einer Küche, einem Bad mt WC und Dusche sowie einem Abstellraum', v: '', id:'f9' },
        {
          r: 0, p: '-' + utils.space(3) + 'Küche\x0a-'
                 + utils.space(3) + 'Bad\x0a-'
                 + utils.space(3) + 'Abstellraum',
          v: '', id:'f10'
        },
        { r: 0, p: '[EINGABEN EINFÜGEN]', v: '', id:'f11' },
        {
          r: 0, p: '-' + utils.space(3) + 'ein Wohnungsschlüssel\x0a-'
                 + utils.space(3) + 'ein Schlüssel für die untere Eingangstür',
          v: '', id:'f12'
        },
        { r: 0, p: '[DATUM]', v: '', id:'f13' },
        { r: 0, p: '[DATUM]', v: '', id:'f14' },
        { r: 0, p: '[BETRAG]', v: '', id:'f15' },
        { r: 0, p: '[BETRAG]', v: '', id:'f16' },
        { r: 0, p: '[BETRAG]', v: '', id:'f17' },
        { r: 0, p: 'Viola Vorlage', v: '', id:'f18' },
        { r: 0, p: 'Musterdorfer Bank', v: '', id:'f19' },
        { r: 0, p: 'IBAN: 1234567', v: '', id:'f20' },
        { r: 0, p: 'BIC: MUSTERBANK', v: '', id:'f21' },
        { r: 0, p: '[BETRAG]', v: '', id:'f22' },
        { r: 0, p: '[EINGABEN EINFÜGEN]', v: '', id:'f23' },
        { r: 0, p: 'Musterdorf', v: '', id:'f24' },
        { r: 0, p: '[DATUM]', v: '', id:'f25' },
        { r: 0, p: '[VORNAME NACHNAME]', v: '', id:'f26' },
        { r: 0, p: '[VORNAME NACHNAME]', v: '', id:'f27' },
      ]
    },{
      title: 'Mietvertrag',
      tpl: 'templates/page2.html',
      fields: []
    },{
      title: 'Garage Mietvertrag',
      tpl: 'templates/page3.html',
      fields: []
    }
  ]

  var doNew = function(p){
    s.docId = utils.getId(6)
    s.shareLink = "https://www.untermietvertrag.com/#/l/" + s.docId
    // s.shareLink = "www.envisagecyberart.in/projects/contract/v7-2/#/l/" + s.docId
    // s.shareLink = "127.0.0.1:8080/#/l/" + s.docId
    s.idx = s.pages.indexOf(p)
    s.page = angular.copy(p)
    // s.currFieldId = 0
    s.filledFields = 0
    s.totalFields = s.page.fields.length?s.page.fields.length:1
    s.zoom = 1
    utils.scroll(0)
  }

  s.new = function(p){
    if(confirm('Möchten Sie wirklich ein neues Dokument erstellen?'))
      doNew(p)
  }

  s.save = function(isAuto){
    s.showLoader = true
    utils
    .save(s.docId, $(".ctn-page").html())
    .then(function(res){
      s.showLoader = false
      if(!isAuto){
        // Alert of saved successfully
        alert(res.message)
      }
    })
  }

  s.focus = function(dir){
    utils.focus(s.currFieldId, dir, utils.fl('filter', s.page.fields, { r: 0 }))
  }

  s.download = function(){
    if(s.filledFields !== s.totalFields){
      alert('Bitte füllen Sie alle Felder aus, bevor Sie PDF herunterladen.')
    }else{
      s.showLoader = true
      utils
      .createPdf(s.docId, $(".doc-title"), $(".section").toArray())
      .then(function(res){
        s.showLoader = false
        // Path of pdf returned,
        utils.download(res.data.path, res.data.name, s)
      })
    }
  }

  s.add = function(){
    alert('Klicken Sie auf einen Abschnitt, um danach einen Textblock hinzuzufügen.')
    s.addPara = true
  }

  s.doAdd = function(e){
    if(s.addPara){
      var div = '<div class="section" ng-click="doAdd($event)">'
          div+= ' <span class="edit" contenteditable placeholder="FÜGEN SIE HIER ABSATZTEXT EIN"></span>'
          div+= ' <div class="ctn-action" ng-click="remove($event)">'
          div+= '  <i class="fa fa-trash"></i>'
          div+= ' </div>'
          div+= '</div>'

      var content = $compile(div)(s)
      content.insertAfter($(e.currentTarget))
      s.addPara = false
    }
  }

  s.remove = function(e){
    var par = $(e.currentTarget).parent()
    , sp = par.find("span.edit").toArray()

    sp.forEach(function(obj){
      s.totalFields--
      s.page.fields.forEach(function(f){
        if(f.id == obj.id)
          f.r = 1
      })
    })

    s.currFieldId = 0

    par.fadeOut(function(){
      this.remove()
    })
  }

  s.zoomFn = function(dir){
    s.zoom = utils.zoom(s.zoom, dir)
  }

  s.$watch('page.fields', function(n, o){
    // l(n, o)
    s.filledFields = utils.getFilledFields(n)
  }, true)

  s.$on('focused', function(e, v){
    s.currFieldId = v.id
  })

  s.$on('$includeContentLoaded', function () {
    $timeout(function() {
      utils.resizeFields($("span.edit").toArray(), s.page.fields)
    })
  })

  doNew(s.pages[0])

}).controller('LoadCtrl', function($scope, $stateParams, utils){
  // l($stateParams)
  var s = $scope
  , id = $stateParams.lId
  if(id == "" || id == null){
    alert("Dokument-ID ist erforderlich!")
  }else{
    utils.getContents(id).then(function(res){
      s.docId = id
      s.pages = res.data
    })
  }

  s.download = function(){
    s.showLoader = true
    utils
    .createPdf(s.docId, $(".doc-title"), $(".section").toArray())
    .then(function(res){
      s.showLoader = false
      utils.download(res.data.path, res.data.name, s)
    })
  }

}).directive('contenteditable', function($sce, $rootScope, utils) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''))
        read() // initialize
      }

      // Listen for change events to enable binding
      element.on('keyup keypress change', function(e) {
        scope.$evalAsync(read)
        if(angular.isUndefined(attrs.multiline)){
          if(e.which === 13){
            element.blur()
          }
          return e.which != 13
        }
      })

      element.on('focus', function() {
        $rootScope.$broadcast('focused', {id: attrs.id})
      })

      element.on('focusout', function() {
        var el = $(this)
        var mw = utils.fl('filter', scope.page.fields, {id: $(this).attr("id")})[0].mw

        var c = el.text().replace(" ", "").charCodeAt(0)
        if (c === 10 || isNaN(c)) {
          el.empty()
          el.css({
            fontWeight: 'normal',
            fontSize: utils.isMobile()?'12px':'14px',
            padding: '5px',
            minWidth: mw,
          })
        }else{
          el.css({
            minWidth: 'unset',
            background: 'none'
          })
        }
      })

      // Write data to the model
      function read() {

        var html = element.html()

        if(html == ''){
          element.css({
            background: '#99e1c9',
            fontWeight: 'normal',
            fontSize: utils.isMobile()?'12px':'14px',
            padding: '5px'
          })
        }else{
          element.css({
            // background: 'none',
            fontWeight: 'bold',
            fontSize: utils.isMobile()?'14px':'16px',
            padding: 0,
            paddingTop: '5px',
            paddingBottom: '5px',
          })
        }

        ngModel.$setViewValue(html)
      }
    }
  }
}).directive('h', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/header.html'
  }
}).directive('f', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/footer.html'
  }
}).directive('l', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/loader.html'
  }
}).filter('trustedHTML', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text)
  }
})
