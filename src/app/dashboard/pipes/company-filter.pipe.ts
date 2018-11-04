import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../../models/company.model';

@Pipe({
  name: 'companyFilter'
})
export class CompanyFilterPipe implements PipeTransform {

  transform(value: Company[], args?: any): any {
    if (!value || !args) {
      return value;
    }
    return value.filter((area) =>
      `${area.asx_code} ${area.name} ${area.industry}`.toLowerCase().indexOf(args.toLowerCase()) > -1);
  }

}
