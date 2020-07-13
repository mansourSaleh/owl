const owlSprite = {
    name:"owl",
    size: {width: 100, height: 100},
    animationTypes: ['IDLE', 'LEFT', 'CENTER', 'RIGHT', 'OPEN', 'CLOSE', 'ALL'],
    frames: [
        require('../../assets/img/idiel.png'),
        require('../../assets/img/left1.png'),
        require('../../assets/img/left2.png'),
        require('../../assets/img/right1.png'),
        require('../../assets/img/right2.png'),
        require('../../assets/img/right3.png'),
        require('../../assets/img/open1.png'), 
        require('../../assets/img/open2.png'), 
        require('../../assets/img/open3.png'), 
        require('../../assets/img/open4.png'), 
        require('../../assets/img/open5.png'), 
        require('../../assets/img/close1.png'),
        require('../../assets/img/close2.png'),
        require('../../assets/img/close3.png'),
        require('../../assets/img/close4.png'),
        require('../../assets/img/close5.png'),
      require('../../assets/img/center1.png'),
      require('../../assets/img/moving_center1.png'),
    ],
    animationIndex: function getAnimationIndex (animationType) {
        // console.log(animationType, "IN INEX")
      switch (animationType) {
        case 'IDLE':
          return [ 0, 16, 0];
        case 'LEFT':
          return [1,17,2];
        case 'CENTER':
            return [2,16];
        case 'RIGHT':
          return [3,4,5];
        case 'OPEN':
          return [15,6,7,8,9,10,10,10, 10, 9, 9,9, 9, 9,7,6, 15];
        case 'CLOSE':
          return [0,11,12,13,14,15];
        case 'ALL':
          return [0,1,2,3,4,5,6,7,8];
        default:
            return [0,16,0]
      }
    },
  };
  
  export default owlSprite;