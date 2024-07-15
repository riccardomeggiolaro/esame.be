/* eslint-disable prettier/prettier */
import { Reflector } from "@nestjs/core";

export const setSchema = Reflector.createDecorator<{name: string}>();