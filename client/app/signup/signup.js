angular.module('myApp.signup', ['factories'])

  .controller('SignupCtrl', function ($scope, authFactory, $state, $uibModalInstance, $uibModal, $cookies) {
    $scope.alreadyExists = null
    $scope.userExistError = false
    $scope.animationsEnabled = true
    $scope.next = false
    $scope.profileButton = false
    $scope.noUserDetail = false

    $scope.user = {
      name: null,
      password: null,
      age: null,
      height: null,
      weight: null,
      gender: null,
      interest: null,
      gym: null
    }

    $scope.submit = function () {
      console.log('userdetails submitted', $scope.user.age, $scope.user.height, $scope.user.weight, $scope.user.gender)
      if (!$scope.user.age || !$scope.user.height || !$scope.user.weight || !$scope.user.gender) {
        console.log('Form not complete')
      } else {
        $uibModalInstance.dismiss('cancel')
        authFactory.registerProfileDetails($scope.user.name, $scope.user.age, $scope.user.height, $scope.user.weight, $scope.user.gender, $scope.user.interest, $scope.user.gym)
          .then(function (data) {
            $cookies.put('token', data.data.token)
            $cookies.put('username', data.config.data.username)
            $state.go('dashboard')
          })

      }

    }


    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }

    $scope.goNext = function () {
      if ($scope.user.name && $scope.user.password) {
        authFactory.registerUserDetails($scope.user.name, $scope.user.password)
          .then(function (data) {
            $scope.alreadyExists = data.data.exists
            if ($scope.alreadyExists) {
              console.log('inside here')
              $scope.noUserDetail = false
              $scope.userExistError = true
            } else {
              $scope.next = true
              $scope.profileButton = true
            }
          })
      } else {
        $scope.noUserDetail = true
      }
    }

    $scope.signin = function () {
      $uibModalInstance.dismiss('cancel')
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signin/signin.html',
        controller: 'SigninCtrl'
      })
    }
  })
