# Universal File Storage Module

A simplified file storage service that supports AWS S3, MinIO, DigitalOcean Spaces, and any S3-compatible storage provider with automatic provider detection.

## Supported Providers

- **AWS S3** - Amazon Simple Storage Service
- **MinIO** - Self-hosted S3-compatible object storage
- **DigitalOcean Spaces** - DigitalOcean's object storage service
- **Any S3-compatible service** - Custom endpoints

## Configuration Examples

### AWS S3
```env
STORAGE_BUCKET=my-aws-bucket
STORAGE_REGION=us-east-1
STORAGE_ACCESS_KEY=AKIA1234567890
STORAGE_SECRET_KEY=your-aws-secret-key
# STORAGE_PROVIDER=aws-s3  # Optional - auto-detected
```

### MinIO
```env
STORAGE_ENDPOINT=http://localhost:9000
STORAGE_BUCKET=my-minio-bucket
STORAGE_REGION=us-east-1
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
STORAGE_FORCE_PATH_STYLE=true
# STORAGE_PROVIDER=minio  # Optional - auto-detected
```

### DigitalOcean Spaces
```env
STORAGE_ENDPOINT=https://nyc3.digitaloceanspaces.com
STORAGE_BUCKET=my-spaces-bucket
STORAGE_REGION=nyc3
STORAGE_ACCESS_KEY=your-spaces-key
STORAGE_SECRET_KEY=your-spaces-secret
# STORAGE_PROVIDER=digitalocean-spaces  # Optional - auto-detected
```

### Custom S3-Compatible Service
```env
STORAGE_ENDPOINT=https://s3.example.com
STORAGE_BUCKET=my-bucket
STORAGE_REGION=us-east-1
STORAGE_ACCESS_KEY=your-access-key
STORAGE_SECRET_KEY=your-secret-key
STORAGE_FORCE_PATH_STYLE=false
STORAGE_PROVIDER=s3-compatible
```

## Legacy AWS Configuration (Backwards Compatibility)

The module still supports legacy AWS environment variables for backwards compatibility:

```env
AWS_S3_BUCKET=my-aws-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA1234567890
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
```

## Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `STORAGE_PROVIDER` | No | Storage provider type (auto-detected if not set) | `aws-s3`, `minio`, `digitalocean-spaces`, `s3-compatible` |
| `STORAGE_ENDPOINT` | No | Custom endpoint for S3-compatible services | `https://nyc3.digitaloceanspaces.com` |
| `STORAGE_BUCKET` | Yes | Storage bucket name | `my-app-bucket` |
| `STORAGE_REGION` | Yes | Storage region | `us-east-1` |
| `STORAGE_ACCESS_KEY` | Yes | Storage access key | `AKIA1234567890` |
| `STORAGE_SECRET_KEY` | Yes | Storage secret key | `your-secret-key` |
| `STORAGE_FORCE_PATH_STYLE` | No | Force path-style URLs (required for MinIO) | `true` |

## Auto-Detection Logic

1. If `STORAGE_PROVIDER` is explicitly set, uses that provider
2. If no endpoint is provided, defaults to AWS S3
3. If endpoint contains `digitaloceanspaces.com`, detects as DigitalOcean Spaces
4. If endpoint contains `minio`, `localhost`, or `127.0.0.1`, detects as MinIO
5. Otherwise, treats as generic S3-compatible service

## Features

- ✅ File upload with automatic content type detection
- ✅ Presigned URLs for secure uploads and downloads
- ✅ File metadata retrieval
- ✅ File deletion
- ✅ Public URL generation (provider-specific)
- ✅ File validation (size and type)
- ✅ Automatic provider detection
- ✅ Legacy configuration support

## Usage

```typescript
import { FilesService } from './files.service';

@Injectable()
export class MyService {
  constructor(private filesService: FilesService) {}

  async uploadFile(buffer: Buffer, originalName: string) {
    return this.filesService.uploadFile(buffer, originalName, {
      folder: 'uploads',
      makePublic: true
    });
  }
}
```

The service automatically handles the differences between providers, so your application code remains the same regardless of which storage provider you're using.