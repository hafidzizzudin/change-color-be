import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('colors')
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  color: string;

  constructor(color: Partial<Color>) {
    Object.assign(this, color);
  }
}
