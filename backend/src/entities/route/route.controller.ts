import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { RouteService } from "./route.service";
import { CreateRouteDTO, RouteDTO } from "./route.dto";

@Controller('routes')
export class RouteController {
    constructor(private readonly routeService: RouteService) {}

    @Get()
    async getAllRoutes() {
        return await this.routeService.getAllRoutes();
    }

    @Post()
    async createRoute(@Body() route: CreateRouteDTO) {
        return await this.routeService.createRoute(route);
    }

    @Patch()
    async updateRoute(@Body() route: RouteDTO) {
        return await this.routeService.updateRoute(route);
    }

    @Delete(':id')
    async deleteRoute(@Param('id') id: string) {
        return await this.routeService.deleteRoute(id);
    }
}