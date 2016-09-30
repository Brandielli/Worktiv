angular.module('worktiv.controllers', [])


/* ------------------------------------------------------------------------------------------------------------------------*/

// Controller tela Login.

.controller('loginCtrl', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {

  // Função para Login Normal
  $scope.login = function(email, password){

      firebase.auth().signOut();

    try {

      firebase.auth().signInWithEmailAndPassword(email, password);

    }
    catch(error) { 

      $scope.error = function(error) {

      if (error === null){

        alert('Sem Erros!');
        
      } else {

        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          
            alert('Senha Inválida');

        if (errorCode === 'auth/user-not-found'){
          
            alert('Seu e-mail é inválido!')
        }

        } else {
            alert(errorMessage); 
        }
          console.log(error);
        }

      };
    
    }  
    finally {

      var user = firebase.auth().currentUser.uid

      if (user === null){

        alert('Falha no Login!')
      
      } else {
        console.log(user);
        $state.go('home');
      }
     

     }
  
  };
   

}])

/* ------------------------------------------------------------------------------------------------------------------------*/

.controller('homeCtrl', ['$scope', '$stateParams',

function ($scope, $stateParams) {

}])
   
/* ------------------------------------------------------------------------------------------------------------------------*/

.controller('checkinCtrl', ['$scope', '$stateParams', 

function ($scope, $stateParams) { 

}])

/* ------------------------------------------------------------------------------------------------------------------------*/

//Controller tela de atividades cadastradas.
   
.controller('activityCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

  $scope.user = firebase.auth().currentUser.displayName;

  var activityRef = firebase.database().ref('activitys/');

  activityRef.on('child_added', function(data) {

    $scope.titulos = [];

    var values = data.val();

    angular.forEach(values, function(value, key) {
      
      $scope.titulos.push(value);

      var titulo = $scope.titulos.push(value);
         console.log(titulo)
    }) 

  });

}])


/* ------------------------------------------------------------------------------------------------------------------------*/

//Controller tela de Cadastro de Atividades.

.controller('addActivityCtrl', ['$scope', '$stateParams', '$state', function ($scope, $stateParams, $state) {
  

  // Array utilizado no ng-options de tipos de atividades.
  $scope.user = firebase.auth().currentUser.displayName;

  $scope.tipos = [
    {descr: 'Implantação'},
    {descr: 'Manutenção'},
    {descr: 'Melhorias'},
    {descr: 'Reunião'},
    {descr: 'Desenvolvimento'},
    {descr: 'Configuração'}
  ];
  
  
  // Function responsável por adicionar atividade ao Firebase.

  $scope.newActivity = function(titulo, solicitante, descricao, tipo) {
      
    var uid = firebase.auth().currentUser.uid;

    firebase.database().ref('activitys/').push({

       uid: uid,
       titulo: titulo,
       solicitante: solicitante,
       descricao: descricao,
       tipo: tipo

    });

    $state.go('activity');

  };

}])
 
/* ------------------------------------------Lixo que pode ser Utilizado--------------------------------------------------*/


  // Function Para Alterar Dados do Objeto User, para usar no back-end WEB.

  // $scope.newActivity = function() {
      
  //   var user = firebase.auth().currentUser;

  //   user = trim(user);
  //   // user.updateProfile({
  //   //   displayName: "Eduardo Brandielli"
  //   // });
  //   console.log(user)

  // };


//  Function para retornar o objeto inteiro do Firebase

  // return firebase.database().ref('activitys/' + userId ).once('value').then(function(snapshot) {

  //   var activity = snapshot.val();
  //   $scope.activity = activity;

  // })

// Exemplo de Append e Preppend

// <!DOCTYPE html>
// <html ng-app="myApp" ng-controller="myCtrl">
// <head>
// <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular.min.js"></script>
// <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-sanitize.js"></script>
// </head>
// <body>
// <button ng-click="appendText()">
//   append
// </button>
// <button ng-click="prependText()">
//   prepend
// </button>
// <div ng-bind-html="divHtmlVar"></div>
// <script>
// var myApp = angular.module('myApp', ['ngSanitize'])
// function myCtrl($scope) {
//     $scope.divHtmlVar = '<b>main html</b>';
//     $scope.appendText = function() {
//       $scope.divHtmlVar = $scope.divHtmlVar + '<br/><i>appended text</i>';  
//     }
//     $scope.prependText = function() {
//       $scope.divHtmlVar = '<i>prepended text</i><br/>' + $scope.divHtmlVar;  
//     }
// }
// </script>
// </body>
// </html>    


