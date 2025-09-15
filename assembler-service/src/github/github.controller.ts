import { Controller, Get, Post, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GitHubService, CreateRepositoryDto, PushToRepoDto } from './github.service';

@ApiTags('GitHub Integration')
@Controller('github')
export class GitHubController {
  constructor(private readonly githubService: GitHubService) {}

  @Post('token')
  @ApiOperation({ summary: 'Store GitHub access token for a user' })
  @ApiResponse({ status: 201, description: 'Token stored successfully' })
  @ApiResponse({ status: 400, description: 'Invalid token data' })
  async storeToken(@Body() tokenData: {
    userId: string;
    accessToken: string;
    refreshToken?: string;
    username?: string;
    email?: string;
    scopes?: string[];
    expiresAt?: string;
  }) {
    const expiresAt = tokenData.expiresAt ? new Date(tokenData.expiresAt) : undefined;

    const token = await this.githubService.storeUserToken(tokenData.userId, {
      ...tokenData,
      expiresAt,
    });

    return {
      success: true,
      tokenId: token.id,
    };
  }

  @Get('repositories/:userId')
  @ApiOperation({ summary: 'Get user repositories from GitHub' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiQuery({ name: 'type', required: false, enum: ['all', 'owner', 'public', 'private'], description: 'Repository type' })
  @ApiResponse({ status: 200, description: 'Repositories retrieved successfully' })
  @ApiResponse({ status: 401, description: 'GitHub token not found or invalid' })
  async getUserRepositories(
    @Param('userId') userId: string,
    @Query('type') type: 'all' | 'owner' | 'public' | 'private' = 'owner'
  ) {
    const repositories = await this.githubService.getUserRepositories(userId, type);
    return {
      success: true,
      repositories,
    };
  }

  @Post('repositories')
  @ApiOperation({ summary: 'Create a new GitHub repository' })
  @ApiResponse({ status: 201, description: 'Repository created successfully' })
  @ApiResponse({ status: 400, description: 'Failed to create repository' })
  @ApiResponse({ status: 401, description: 'GitHub token not found or invalid' })
  async createRepository(@Body() createRepoData: {
    userId: string;
    name: string;
    description?: string;
    private?: boolean;
    autoInit?: boolean;
  }) {
    if (!createRepoData.userId || !createRepoData.name) {
      throw new BadRequestException('userId and name are required');
    }

    const repository = await this.githubService.createRepository(createRepoData.userId, {
      name: createRepoData.name,
      description: createRepoData.description,
      private: createRepoData.private,
      autoInit: createRepoData.autoInit,
    });

    return {
      success: true,
      repository,
    };
  }

  @Post('push')
  @ApiOperation({ summary: 'Push generated project to GitHub repository' })
  @ApiResponse({ status: 200, description: 'Project pushed successfully' })
  @ApiResponse({ status: 400, description: 'Failed to push to repository' })
  @ApiResponse({ status: 401, description: 'GitHub token not found or invalid' })
  async pushToRepository(@Body() pushData: PushToRepoDto) {
    if (!pushData.userId || !pushData.repositoryName || !pushData.projectPath) {
      throw new BadRequestException('userId, repositoryName, and projectPath are required');
    }

    const result = await this.githubService.pushProjectToRepository(pushData);
    return {
      success: result.success,
      repositoryUrl: result.repositoryUrl,
    };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get GitHub user information' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User information retrieved successfully' })
  @ApiResponse({ status: 401, description: 'GitHub token not found or invalid' })
  async getUserInfo(@Param('userId') userId: string) {
    const userInfo = await this.githubService.getUserInfo(userId);
    return {
      success: true,
      user: userInfo,
    };
  }

  @Post('validate/:userId')
  @ApiOperation({ summary: 'Validate GitHub token for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Token validation result' })
  async validateToken(@Param('userId') userId: string) {
    const isValid = await this.githubService.validateToken(userId);
    return {
      success: true,
      valid: isValid,
    };
  }

  @Post('revoke/:userId')
  @ApiOperation({ summary: 'Revoke GitHub token for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Token revoked successfully' })
  async revokeToken(@Param('userId') userId: string) {
    const revoked = await this.githubService.revokeToken(userId);
    return {
      success: true,
      revoked,
    };
  }
}