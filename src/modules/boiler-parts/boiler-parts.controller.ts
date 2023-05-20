import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { BoilerPartsService } from './boiler-parts.service';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  FindOneResponse,
  GetBestsellersResponse,
  GetNewPartsResponse,
  GetOneByNameRequest,
  GetOneByNameResponse,
  PaginateAndFilterResponse,
  SearchRequest,
  SearchResponse,
} from './types';

@Controller('boiler-parts')
export class BoilerPartsController {
  constructor(private readonly boilerPartsService: BoilerPartsService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.boilerPartsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.boilerPartsService.findOne(id);
  }

  @ApiBody({ type: GetOneByNameRequest })
  @ApiOkResponse({ type: GetOneByNameResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('name')
  getOneByName(@Body() { name }: { name: string }) {
    return this.boilerPartsService.findOneByName(name);
  }

  @ApiOkResponse({ type: GetBestsellersResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('bestsellers')
  getBestsellers() {
    return this.boilerPartsService.getBestsellers();
  }

  @ApiOkResponse({ type: GetNewPartsResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('new')
  getNew() {
    return this.boilerPartsService.new();
  }

  @ApiBody({ type: SearchRequest })
  @ApiOkResponse({ type: SearchResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('search')
  search(@Body() { query }: { query: string }) {
    return this.boilerPartsService.search(query);
  }
}
