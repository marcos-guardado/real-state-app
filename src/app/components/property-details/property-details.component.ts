import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProperty } from 'src/app/interfaces/property.interface';
import { PropertiesService } from 'src/app/services/properties.service';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChildren('renderContainer') canvasRef!: QueryList<
    ElementRef<HTMLDivElement>
  >;
  showModel: boolean = false;
  isLoadingModel: boolean = false;
  loadingPercentage: number = 0;
  id!: string;
  property!: IProperty;
  isLoading: boolean = false;
  params$!: Subscription;
  property$!: Subscription;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService
  ) {}

  ngAfterViewInit(): void {
    this.canvasRef.changes.subscribe(
      (comps: QueryList<ElementRef<HTMLDivElement>>) => {
        this.createScene();
      }
    );
  }

  ngOnInit(): void {
    this.params$ = this.route.params.subscribe(({ id }: Params) => {
      this.id = id;
    });
    this.isLoading = true;
    this.property$ = this.propertiesService
      .getPropertyById(this.id)
      .subscribe((property) => {
        this.property = { ...property } as IProperty;
      });
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe();
    this.property$.unsubscribe();
  }

  show3dModel() {
    this.showModel = true;
  }

  hide3dModel() {
    this.showModel = false;
  }

  async createScene() {
    const renderer = new THREE.WebGLRenderer();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    renderer.setSize(window.innerWidth - 100, window.innerHeight - 200);
    camera.lookAt(scene.position);
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);
    this.canvasRef.first.nativeElement.appendChild(renderer.domElement);
    const loader = new OBJLoader();

    const modelUrl = await this.propertiesService.getPropertyModelRef(
      this.property
    );
    loader.load(
      modelUrl,
      // called when resource is loaded
      function (object) {
        const animate = function () {
          object;
          requestAnimationFrame(animate);
          controls.update();
          scene.add(object);
          renderer.render(scene, camera);
        };
        animate();
      },
      // called when loading is in progresses
      (xhr) => {
        this.isLoadingModel = true;
        this.loadingPercentage = parseInt(
          ((xhr.loaded / xhr.total) * 100).toFixed(1)
        );
        if (this.loadingPercentage === 100) this.isLoadingModel = false;
      },
      // called when loading has errors
      function (error) {
        console.log('An error happened');
      }
    );

    camera.position.z = 5;
    renderer.render(scene, camera);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // const animate = function () {
    //   requestAnimationFrame(animate);

    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;

    //   renderer.render(scene, camera);
    // };
    // camera.position.z = 5;
    // renderer.render(scene, camera);
    // animate();
  }
}
