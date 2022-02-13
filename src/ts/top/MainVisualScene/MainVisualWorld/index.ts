import * as THREE from 'three';
import * as ORE from '@ore-three-ts';

import { LayerInfo } from '@ore-three-ts';
import { Garbages } from './Garbage';
export class MainVisualWorld {

	private commonUniforms: ORE.Uniforms;
	private scene: THREE.Scene;

	private layerInfo: ORE.LayerInfo;
	private garbages: Garbages;

	constructor( info: LayerInfo, scene: THREE.Scene, parentUniforms: ORE.Uniforms ) {

		this.layerInfo = info;
		this.scene = scene;

		this.commonUniforms = ORE.UniformsLib.mergeUniforms( parentUniforms, {
		} );

		/*-------------------------------
			Garbages
		-------------------------------*/

		this.garbages = new Garbages( this.scene.getObjectByName( 'Garbages' ) as THREE.Object3D, this.commonUniforms );

	}

	public resize( layerInfo: ORE.LayerInfo ) {

	}

}
