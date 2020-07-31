# robiot
![Build, Quality, Test](https://github.com/Ca-Cybersecurity-Robiot/robiot/workflows/Build,%20Quality,%20Test/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e7d04395ccee48d5bcf0ed850cfc1078)](https://app.codacy.com/gh/Ca-Cybersecurity-Robiot/robiot?utm_source=github.com&utm_medium=referral&utm_content=Ca-Cybersecurity-Robiot/robiot&utm_campaign=Badge_Grade_Settings)

## SSL/TLS Sécurisation du lien entre robiot et API

l'objectif de ce chapitre est de présenter une méthode d'authentification basée sur les certificats SSL/TLS et la configuration tomcat.
Cette méthode requiert au minimum 3 certificats :
 - un certificat pour l'autorité de certification, ce certificat peut être généré manuellement 
 ou bien vous pouvez acheter les signatures nécessaire auprès d'une autorité de certification 
 - Un certificat pour le serveur (à faire signer par l'autorité de certification)
 - Un certificat pour le client (à faire signer par l'autorité de certification)
 
Après l'obtention des certificats l'objectif est de mettre à jour la configuration de tomcat afin activer l'authentification 
d'un client par certificat. Enfin nous ajoutons des contraintes de securités afin de limiter les url et méthode HTTP disponible.

### 1 -  Création du certificat de l'autorité de certification (cette étape n'est pas nécessaire si vous payez pour l'obtenir) 

```shell script
# Création d'une clef privée pour notre CA
openssl genrsa -out CAkey.key 1024

# Création du CSR basé sur la clé. 
# Après la saisie de cette commande il faut répondre à quelque question
openssl req -new -key CAkey.key -out CAReq.csr -config /etc/ssl/openssl.cnf 

# enfin nous signons nous même le certificat avec la commande suivante
openssl x509 -req -days 365 -in CAReq.csr -signkey CAKey.key -out CA.crt
```

### 2 -  Création du certificat pour le serveur

```shell script
# Création d'une clef privée pour notre serveur
openssl genrsa -out ServerKey.key 1024

# Création du CSR basé sur la clé. 
# Après la saisie de cette commande il faut répondre à quelque question
openssl req -new -key ServerKey.key -out ServerReq.csr -config /etc/ssl/openssl.cnf 

# enfin nous signons nous même le certificat avec celui de l'autorité de certification 
openssl x509 -req -days 365 -CA CA.crt -CAkey CAKey.key -CAcreateserial -in ServerReq.csr -out Server.crt
```

### 3 -  Création du certificat pour le client

```shell script
# Création d'une clef privée pour notre client
openssl genrsa -out ClientKey.key 1024

# Création du CSR basé sur la clé. 
# Après la saisie de cette commande il faut répondre à quelque question
openssl req -new -key ClientKey.key -out CleintReq.csr -config /etc/ssl/openssl.cnf 

# enfin nous signons nous même le certificat avec celui de l'autorité de certification 
openssl x509 -req -days 365 -CA CA.crt -CAkey CAKey.key -CAcreateserial -in CleintReq.csr -out Client.crt
```

### 4 -  Convertion d'un certificat du format crt ver p12

```shell script
# Nous convertissons le certificat client au format p12 pour effectuer les test depuis notre navigateur
openssl pkcs12 -export -in Cleint.crt -inkey ClientKey.key -chain -CAfile CA.crt -out ClientCert.p12

```

### 5 -  Création du truststore pour le serveur tomcat

```shell script
# Nous importons le certificat de l'autorité de certification au sein du truststore
keytool -import -alias CertAuth -keystore caCerts.jks -file CA.crt
```

### 5 -  Création du keystore pour le serveur tomcat

```shell script
# Nous pouvons utiliser cette commande pour importer tous les certificats au quels nous souhaitons autoriser l'acces
keytool -importkeystore -destkeystore tomcat.keystore -srckeystore -ServerCert.p12 -srcstoretype PKCS12 -alias 1
keytool -importkeystore -destkeystore tomcat.keystore -srckeystore -ClientCert.p12 -srcstoretype PKCS12 -alias 2
```

### 6 -  Mettre à jour  l'endpoint sécurisé dans le fichier Server.xml

```shell script
<Connector port="8443"
           protocol="org.apache.coyote.http11.Http11NioProtocol"
           SSLEnabled="true" scheme="https" secure="true"
           truststoreFile="/opt/tomcat/apache-tomcat-9.0.37/certificat/CA/caCerts.jks" truststorePass="password"
	   keystoreFile="/opt/tomcat/apache-tomcat-9.0.37/certificat/tomcat.keystore" keystorePass="password"
           clientAuth="false" sslProtocol="TLS"
           />
```

### 7 -  Mettre à jour les utilisateurs dans le fichier tomcat-user.xml

```shell script
  # Nous créons un utilisateur avec les informations du certificat généré
  # Création du rôle robiot
  <role rolename="robiot" />	  
  <user username="tomcat" password="password" roles="manager-gui"/>
  <user username="CN=127.0.0.1, OU=Secu Services, O=Robiot-Secu, L=Rennes, ST=Bretagne, C=FR" password="null" roles="robiot"/>
```

### 8 -  Mettre à jour les contraintes de sécurités pour le rôle robiot dans le fichier web.xml

```shell script
  <security-constraint>
    <web-resource-collection>
    <web-resource-name>robiot app</web-resource-name>
      # Restriction de l'utilisateur authentifié au url commencant par /ecotree/
      # Limite du type de requete HTTP
      <url-pattern>/ecotree/*</url-pattern>
      <http-method>GET</http-method>
      <http-method>PUT</http-method>
    </web-resource-collection>
    <auth-constraint>
      # Application de ces contraintes au rôle robiot
      <role-name>robiot</role-name>
    </auth-constraint>
  </security-constraint>
  <login-config>
    # Précision du type d'authentification attendue
    <auth-method>CLIENT-CERT</auth-method>
    <realm-name>robiot app</realm-name>
  </login-config>
  <security-role>
    <role-name>robiot</role-name>
  </security-role>
```


## API
For run API :

Run 
```shell script
cd api/
docker-compose up -d
```
Run 

``
npm install
``

And run 

``
npm start
``

OR debug mode :

``
npm run watch-debug
``

## CLIENT
For run client :

Run 
```shell script
cd client/
npm install
```
And run

``
npm start
``

End to end test :

``
npm run e2e
``

## Commons commands

Build application :

``
npm run build
``

Run unit test :

``
npm run test
``

Check update dependencies major :

``
npm run ncu
``

Check error lint :

``
npm run lint
``

auto-fix : 

``
npm run lint -- --fix
``


