import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvitesModule } from './invites/invites.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [UsersModule, WebhooksModule, OrganizationsModule, InvitesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
