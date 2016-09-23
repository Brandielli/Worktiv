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

      var activitys = data.val.titulo;
      $scope.activitys;
      // console.log(data)
  });

  // return firebase.database().ref('activitys/' + userId ).once('value').then(function(snapshot) {

  //   var activity = snapshot.val();
  //   $scope.activity = activity;

  // })

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


