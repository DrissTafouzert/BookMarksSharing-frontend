export class RandomColor 
{
    colors:string[]=['5F9EA0', 'DEB887', '6495ED','D2691E',
                    'A9A9A9','556B2F','483D8B',
                    'E9967A','F0E68C','87CEFA'];

    public getColor():string
    {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}
