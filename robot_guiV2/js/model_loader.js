import * as THREE from 'three';
import URDFLoader from 'urdf-loader';

class ModelLoader {
    constructor() {
      this.manager = new THREE.LoadingManager();
      this.loader = new URDFLoader(this.manager);

      this.robot;
    }
    
    onLoad(scene) {
        // Set up shadow properties
        this.robot.traverse(c => {
            c.castShadow = true;
            c.receiveShadow = true;
        });

        // Update the matrix world
        //this.robot.updateMatrixWorld(true);

        // Add robot to the scene
        scene.add(this.robot);
    }

    loadRobot(name, scene) {
        this.loader.load('data/MairaDAE/urdf/maira7M.urdf', (result) => {
            this.robot = result;

            this.onLoad(scene);

            return this.robot;

        });
    }

    setJointAngles(angles) {
        for (let i = 0; i < angles.length; i++) {
            if(this.robot)
                this.robot.setJointValue( `maira7M_joint${i + 1}`, angles[i]);
        }
    }
  
  }

  
export default ModelLoader;