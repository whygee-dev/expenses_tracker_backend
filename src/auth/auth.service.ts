import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getAuth } from 'firebase-admin/auth';
import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { SignJWT, importJWK } from 'jose';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  #firebaseApp = initializeApp({
    credential: credential.cert(
      this.configService.get('GOOGLE_APPLICATION_CREDENTIALS'),
    ),
  });

  #appAuth = getAuth(this.#firebaseApp);

  async verifyToken(token: string) {
    const decodedToken = await this.#appAuth.verifyIdToken(token);

    return decodedToken;
  }

  async authenticateUser(userToken: string) {
    const decodedToken = await this.verifyToken(userToken);

    const uid = decodedToken.uid;

    const decodedPrivateKey = Buffer.from(
      String(this.configService.get('POWERSYNC_PRIVATE_KEY')),
      'base64',
    );

    const powerSyncPrivateKey = JSON.parse(
      new TextDecoder().decode(decodedPrivateKey),
    );

    const powerSyncKey = await importJWK(powerSyncPrivateKey);

    const token = await new SignJWT({})
      .setProtectedHeader({
        alg: powerSyncPrivateKey.alg,
        kid: powerSyncPrivateKey.kid,
      })
      .setSubject(uid)
      .setIssuedAt()
      .setIssuer(this.configService.get('JWT_ISSUER'))
      .setAudience(this.configService.get('POWERSYNC_URL'))
      .setExpirationTime('5m')
      .sign(powerSyncKey);

    const responseBody = {
      token,
      powerSyncUrl: String(this.configService.get('POWERSYNC_URL')),
      expiresAt: null,
      userId: uid,
    };

    return responseBody;
  }

  async getKeys() {
    const decodedPublicKey = Buffer.from(
      String(this.configService.get('POWERSYNC_PUBLIC_KEY')),
      'base64',
    );
    const powerSyncPublicKey = JSON.parse(
      new TextDecoder().decode(decodedPublicKey),
    );

    return {
      keys: [powerSyncPublicKey],
    };
  }
}
