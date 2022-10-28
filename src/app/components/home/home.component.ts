import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  houses!: any[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();

    this.houses = [
      {
        title: 'Oregon Ville',
        image: 'https://i.imgur.com/FrVr20b.png',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nobis atque ab deserunt voluptates asperiores vel sequi possimus, aut vero, sapiente amet aspernatur, quam autem nostrum. Magnam ducimus culpa ab non velit esse dolorem maiores modi. Repudiandae esse ea ex quos accusamus ut possimus sunt dolorum voluptate, reprehenderit atque officia!',
      },
      {
        title: 'Oregon Ville',
        image: 'https://i.imgur.com/TillIKB.png',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nobis atque ab deserunt voluptates asperiores vel sequi possimus, aut vero, sapiente amet aspernatur, quam autem nostrum. Magnam ducimus culpa ab non velit esse dolorem maiores modi. Repudiandae esse ea ex quos accusamus ut possimus sunt dolorum voluptate, reprehenderit atque officia!',
      },
      {
        title: 'Oregon Ville',
        image: 'https://i.imgur.com/LMwjqcj.jpg',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nobis atque ab deserunt voluptates asperiores vel sequi possimus, aut vero, sapiente amet aspernatur, quam autem nostrum. Magnam ducimus culpa ab non velit esse dolorem maiores modi. Repudiandae esse ea ex quos accusamus ut possimus sunt dolorum voluptate, reprehenderit atque officia!',
      },
      {
        title: 'Oregon Ville',
        image: 'https://i.imgur.com/QcCZrPs.png',
        description:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit nobis atque ab deserunt voluptates asperiores vel sequi possimus, aut vero, sapiente amet aspernatur, quam autem nostrum. Magnam ducimus culpa ab non velit esse dolorem maiores modi. Repudiandae esse ea ex quos accusamus ut possimus sunt dolorum voluptate, reprehenderit atque officia!',
      },
    ];
  }
}
