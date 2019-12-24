www.bashe.io official website source file. If you need to rebuild it, please upload it to https://aws.amazon.com and use S3 and cloudfront. [点击这里查看中文版](README_zh.md)

Follow these Introduction:

## I cloud service deployment

### Part 1 registers with AWS and verifies the domain name

You can use `AWS` https://aws.amazon.com or other cloud computing services and object storage systems. Here we use `S3` and `cloudfront` of AWS as examples.

**Advanced understanding **: `S3` is the simple storage service of AWS, which is used to store page resources in AWS`s global network. `CloudFront` is the Content Delivery Network of AWS, that is, after the page resources are deployed to the storage service provided by AWS, when users use the cloudfront URL to request static content, the service will root According to the IP of the request and the location of the data center where the content is cached, the data center of the edge acceleration node closest to the IP is found, so that all requests from the same location will reduce the delay time. Users anywhere in the world can pull your page resources faster and experience better.

1. Register for AWS account: https://portal.aws.amazon.com/billing/signup fill in the real credit card information on the `payment information` page for account verification. After that, the support plan can be free of charge. Many resources of AWS are free, and only when the resources are used excessively, can the fee be charged. For example, S3 and cloudfront storage within 5GiB in the guide are free use for 12 months.

After completion, you can log in to the console: https://console.aws.amazon.com/ the default area displayed in the top right corner of the console is `Ohio`. Click to switch to `Singapore` and other desired areas.

2. Because you may need to bind your own domain name for `S3` and `cloudfront`, it is recommended that you conduct domain name verification in advance, which takes a long time to facilitate the smooth deployment of next steps. Apply for a certificate for this domain name: https://cconsole.aws.amazon.com/acm

  a. First, click the area in the upper right corner to switch to `Northern Virginia`. Only certificates applied for in this region can be used in combination with `cloudfront`.
  b. Click request Certificate - Request public certificate, click request certificate, enter your domain name in add domain name, here you can click Add to specify multiple possible domain names for the certificate, next, DNS verification, next, audit, confirm and request.
  c. Click `▶` under `authentication` - `domain`, expand ACM authentication content, and add CNAME record to DNS configuration of domain (see part2 for DNS configuration mode). After saving CNAME, we need to wait for a while, ACM can only automatically verify after it takes effect.
  d. After verification, the status will change to issued, and the certificate can be used. Now you can switch the area to another area that you want to use.

**Advanced understanding**: www.example.org is the sub domain name, and example.org is the root domain name. Because to use CNAME, most domain name service providers do not support the form of root domain name CNAME, or can not use the form of root domain name MX and name: example.org at the same time. Therefore, in the above steps, you can only fill in the subdomain name `a086xxxx3c44448f11ad7. www` for verification, so ACM can visit `a086xxxx3c44448f11ad7. www.example.org` as long as you can get value of `b985b312234xxxxxxxf20dfdb.mzlfeqexyx.acm-validations.aws` can prove that you own this domain name.    

### Part2 domain name registration and resolution (DNS settings)

Here, we take dynadot.com as an example to introduce how to set up domain name DNS to resolve domain names to cloud services.

Go to https://www.dynadot.com to `log in` or `register`.

1. If the existing domain name skips this step, if you need to register a new domain name, click `domain name` - `search` in the upper right corner, enter the domain name you want to search, if available, `add shopping cart`, click `shopping cart icon` - `View Cart` in the upper right corner, select the registration time limit on the shopping cart page, preferably a longer time and set the alarm clock, in case you forget to renew the domain name, it will be deleted. Click `check out` after setting. `Payment Method` can choose payment methods such as PayPal. If you choose the top right corner charging method as CNY, you can use Alipay and WeChat payment, click `submit order`, will generate the payment link, click the pop-up two-dimensional code, scan payment.

2. If you have a domain name, click my domain name - `manage domain name` on the page https://www.dynadot.com/zh/account/ and click the link below `DNS settings` (it may display`domain name docking`or`Dynadot DNS: xxx `). Enter the DNS settings page. The new domain name will display`domain name parking`by default. Click the drop-down menu and select`custom DNS`.

  a. The domain name record (required) is the record of example.com. The most commonly used record type is`A`. Select the record type as`A`, `IP address / target host` fill in your server IP to point example.com to your server, and then configure nginx or Apache on the server to access the website;
  b. If you want to point the subdomain name to AWS cloudfront and so on, in the domain name record (required), select the record type as` CNAME `, ` IP address / target host` fill in the domain name assigned by AWS, then you can realize the custom domain name. If you need to use the mailbox custom domain name MX at the same time, you cannot set the CNAME for the root domain name. You can consider setting the WWW subdomain name CNAME, and then use to There are two ways to forward the root domain name: (1) record the root domain name a to a server IP, and forward the domain name to the server; (2) use `forward 301` to `http://www.example.com` in DNS;
  c. Here you can also fill in MX for mailbox configuration and TXT for domain name verification;
  d. In the sub domain name record (optional), fill in the sub domain name you want to use. For example, www.example.com is the sub domain name. Fill in the sub domain name column of WWW, and select the record type as`A`or`CNAME`. Fill in your server IP address / target host, and then point www.example.com to your server;
  e. In domain name verification scenarios such as certificate application, you can decide what information to fill in to the `sub domain name` column according to whether there is a sub domain name;
  f. Subdomain names refer to AWS cloudfront and other services, which also use `CNAME` records. The operation mode is the same as the root domain name, except that the subdomain name is added in front.
  g. Click `save DNS` after configuration, and wait for it to take effect. The effective time varies from a few minutes to dozens of minutes.

Above, the server deployment preparation is completed.

## II deploy page resources to S3 and enable cloudfront

1. First, we deploy a S3 to store the deployed wallet page resources. Click `services`-`storage`-`S3`in the upper left corner of AWS, open`S3 bucket`, and click`create bucket`.

a. In the name and area page, enter the domain name or secondary domain name of the website you want to build in the bucket name, select the data center location where you want to store this resource in the area, and select the next step. The configuration option is OK by default, or it can be modified according to the demand. In the set permissions, uncheck block all public access permissions, so that the page resources can be accessed by public network users` Next, click Create bucket.
b. After completion, you can see the bucket you created in the `S3 bucket` homepage list. Click to enter, click `properties` - `static website hosting` - `use this bucket to host websites,` `index documents`, `error documents` are all filled in `index.html` and `save`.
c. At this time, the static page resources can be uploaded. Click upload in the overview of this bucket, select all the files under the root directory of the page resources to enter the upload page, and then click next. In set permissions - manage public permissions, select grant public read access permissions to this object, next, select standard, next, upload.
d. At this time, the page you uploaded can be accessed externally. The links displayed in the `properties` - static website hosting `and the` terminal node `are the links of page resources accessed externally. However, the resources in S3 can only be accessed with the domain name provided by AWS. If you want to access with your own domain name, you need to set CNAME for the domain name DNS to resolve to the link displayed in the attribute - `static website hosting`, `terminal node`. Moreover, according to the data center region you choose and the network policy of the visitor`s location, the link may not be accessible in some regions or the access speed may not be reached Slower, so we also need to enable cloudfront for global content publishing services for this bucket.

2. Enable cloudfront for this S3 bucket, click `services` - `networking and content distribution storage` - `cloudfront` in the upper left corner of AWS, open `cloudfront allocation`, and click `create allocation`.

a. Select `Web Start` in `content distribution method`, select your S3 bucket name in the `source domain name` drop-down menu, fill in `en/index.html` in `default root object`, `redirect HTTP to HTTPS` in`viewer protocol policy`, and fill in your domain name in`cnames` (provided that you have successfully applied for Certificate in Chapter II, part2-2 Book), `SSL certificate` select `custom SSL Certificate (example. Com)`, and select the certificate applied for in `chapter I, Part1-2` from the drop-down menu in the input box below. By default, click Create assignment. At this time, the new assignment you set has appeared on the `cloudfront assignment` page, and a domain name of `*. Cloudfront. Net` has been assigned. Open the domain name in the browser, and AWS will automatically select the nearest data center according to the source of the request.
b. Now we bind the domain name, enter the DNS Management panel of your domain name, fill in your subdomain name in the `subdomain name record` of the domain name DNS, select `CNAME` as the `record type`, and `IP address / target host` fill in the `*.Cloudfront.net` domain name generated in the previous step. If you use the root domain name, you only need to select `CNAME` in `domain name record` and `IP address / target host` to fill in `*. Cloudfront. Net` generated in the previous step. (see part2 in Chapter I for DNS configuration mode). After setting, you will need to wait for DNS to take effect. After taking effect, when you visit your domain name, you will no longer be prompted `unable to access this website`. Instead, you will enter the same page as `*. Cloudfront. Net`. The configuration is successful.
c. It needs to be reminded that every modification of cloudfront will need to be synchronized to all data centers around the world, so it will take a certain time. Don`t worry if the modification doesn`t take effect immediately. Just wait a few minutes.

After taking effect, you can use your domain name to open in the browser, so far, a web page configured for global content distribution has been configured.
