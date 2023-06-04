import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private adminService: AdminService,
    private jwtService: JwtService
  ) { }
  
  async auth({ token }: AuthDto){
    console.log(token, process.env.JWT_SECRET)
    const { username } = await this.jwtService.verifyAsync(
      token,
      {
        secret: process.env.JWT_SECRET
      }
    );
    const foundedAdmin = await this.adminService.findOneByName(username);

    return foundedAdmin;
  }

  async login({ username, password }: LoginDto) {
    const foundedAdmin = await this.adminService.findOneByName(username);

    if (!foundedAdmin) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'NOT FOUND',
      }, HttpStatus.NOT_FOUND);
    }
    const payload = { username: foundedAdmin.username, id: foundedAdmin.id };
    if(foundedAdmin.password === password){
      return {
       admin: foundedAdmin,
       access_token: await this.jwtService.signAsync(payload),
      }
    }
  }

  async register({ username, password }: RegisterDto) {
    const foundedAdmin = await this.adminService.findOneByName(username);
    if (foundedAdmin) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'User alredy created',
      }, HttpStatus.FORBIDDEN);
    }

    const admin = await this.adminService.create({username, password});
   
    const payload = { username: admin.username, id: admin.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      admin,
    };
  }
}
